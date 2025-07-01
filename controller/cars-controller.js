// const mysql = require('mysql2')
// const connection = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: '7554',
//   database: 'demo'
// })

const connection = require("../db/db");

const saveCars = (req, res) => {
  connection.query('INSERT INTO cars (brand, model, price, user_id) VALUES (?, ?, ?, ?)', [
    req.body.brand,
    req.body.model,
    req.body.price,
    req.body.user_id
  ], (err, rows) => {
    if (err) throw err
    res.json(rows);
  })
}

const deleteCars = (req, res) => {
  connection.query('DELETE FROM cars WHERE id = ?', [req.params.id], (err, rows) => {
    if (err) throw err
    res.json(rows);
  })
}

const updateCars = (req, res) => {
  connection.query('UPDATE cars SET brand = ?, model = ?, price = ?, user_id = ? WHERE id = ?', [
    req.body.brand,
    req.body.model,
    req.body.price,
    req.body.user_id,
    req.params.id
  ], (err, rows) => {
    if (err) throw err
    res.json(rows);
  })
}

const getAllCars = (req, res) => {
  connection.query('SELECT * FROM cars', (err, rows) => {
    if (err) throw err
    res.json(rows);
  })
}

// const getAllCarsWithUsers = (req, res) => {
//   connection.query('select * from users left join cars on users.id = cars.user_id', (err, rows) => {
//     if (err) throw err
//     res.json(rows);
//   })
// }

const getAllCarsWithUsers = (req, res) => {
  const query = `
    SELECT 
      users.id AS userId,
      users.name AS userName,
      cars.id AS carId,
      cars.model AS carModel,
      cars.user_id AS carUserId
    FROM users 
    LEFT JOIN cars ON users.id = cars.user_id
  `;

  connection.query(query, (err, rows) => {
    if (err) throw err;

    const grouped = [];

    rows.forEach(row => {
      let user = grouped.find(u => u.id === row.userId);
      
      if (!user) {
        user = {
          id: row.userId,
          name: row.userName,
          cars: []
        };
        grouped.push(user);
      }

      if (row.carId) {
        user.cars.push({
          id: row.carId,
          model: row.carModel,
          user_id: row.carUserId
        });
      }
    });

    res.json(grouped);
  });
};




module.exports = {
  saveCars,
  deleteCars,
  updateCars,
  getAllCars,
  getAllCarsWithUsers
}