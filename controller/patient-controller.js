// const mysql = require('mysql2')
// const connection = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: '7554',
//   database: 'demo'
// })

const connection = require("../db/db");


const savePatient = (req, res) => {
  connection.query('insert into users (name, age, address, email) values(?, ?, ?, ?)',[
    req.body.name,
    req.body.age,
    req.body.address,
    req.body.email
  ], (err, rows) => {
  if (err) throw err
  res.json(rows);
})
}

const saveUserWithCars = (req, res) => {
  const { name, age, address, email, cars } = req.body;

  // Step 1: Insert the user
  connection.query(
    'INSERT INTO users (name, age, address, email) VALUES (?, ?, ?, ?)',
    [name, age, address, email],
    (err, userResult) => {
      if (err) {
        console.error('Error inserting user:', err);
        return res.status(500).json({ error: 'Failed to insert user' });
      }

      const userId = userResult.insertId;

      // Step 2: Insert cars if any
      if (!cars || cars.length === 0) {
        return res.json({ message: 'User saved without cars', userId });
      }

      const carValues = cars.map(car => [car.brand, car.model, car.price, userId]);

      connection.query(
        'INSERT INTO cars (brand, model, price, user_id) VALUES ?',
        [carValues],
        (err, carResult) => {
          if (err) {
            console.error('Error inserting cars:', err);
            return res.status(500).json({ error: 'Failed to insert cars' });
          }

          res.json({
            message: 'User and cars saved successfully',
            userId,
            insertedCars: carResult.affectedRows
          });
        }
      );
    }
  );
};


const deletePatient = (req, res) => {
  // const { id } = req.params;
  connection.query('delete from users where id = ?', [req.params.id], (err, rows) => {
    if (err) throw err
    res.json(rows);
  })
}

const getAllPatients = (req, res) => {
  connection.query('select * from users', (err, rows) => {
    if (err) throw err
    res.json(rows);
  })
}
const getAllUsersWithBooks = (req, res) => {
  connection.query('select * from users left join books on users.id = books.user_id', (err, rows) => {
    if (err) throw err
    res.json(rows);
  })
}



const updatePatient = (req, res) => {
  connection.query('update users set name = ?, age = ?, address = ?, email = ? where id = ?', [
    req.body.name,
    req.body.age,
    req.body.address,
    req.body.email,
    req.params.id
  ], (err, rows) => {
    if (err) throw err
    res.json(rows);
  })
}



module.exports = {
  savePatient,
  saveUserWithCars,
  deletePatient,
  getAllPatients,
  updatePatient,
  getAllUsersWithBooks
}