const mysql = require('mysql2')
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '7554',
  database: 'demo'
})

const bcrypt = require('bcrypt');

const saveRegistration = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    connection.query(
      'INSERT INTO register (username, email, password) VALUES (?, ?, ?)',
      [username, email, hashedPassword],
      (err, results) => {
        if (err) {
          console.error('Error inserting data:', err);
          return res.status(500).json({ error: 'Database error' });
        }
        res.status(201).json({ message: 'User registered successfully', id: results.insertId });
      }
    );
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};


// const saveRegistration = (req, res) => {
//   connection.query('insert into register (username, email, password) values(?, ?, ?)',[
//     req.body.username,
//     req.body.email,
//     req.body.password
//   ], (err, rows) => {
//   if (err) throw err
//   res.json(rows);
// })
// }

const loginUser = (req, res) => {
  const { email, password } = req.body;

  // Find the user by email
  connection.query(
    'SELECT * FROM register WHERE email = ?',
    [email],
    async (err, results) => {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).json({ error: 'Database error' });
      }

      if (results.length === 0) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }

      const user = results[0];

      // Compare provided password with hashed password
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }

      // Successful login
      res.status(200).json({ message: 'Login successful', user: { id: user.id, username: user.username, email: user.email } });
    }
  );
};

const getAllUsers = (req, res) => {
  connection.query('select * from register', (err, rows) => {
    if (err) throw err
    res.json(rows);
  })
}

module.exports = {
  saveRegistration,
  loginUser,
  getAllUsers
};