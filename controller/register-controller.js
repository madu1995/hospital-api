const mysql = require("mysql2");
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "7554",
  database: "demo",
});

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const saveRegistration = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    connection.query(
      "INSERT INTO register (username, email, password) VALUES (?, ?, ?)",
      [username, email, hashedPassword],
      (err, results) => {
        if (err) {
          console.error("Error inserting data:", err);
          return res.status(500).json({ error: "Database error" });
        }
        res.status(201).json({
          message: "User registered successfully",
          id: results.insertId,
        });
      }
    );
  } catch (error) {
    res.status(500).json({ error: "Server error" });
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
    "SELECT * FROM register WHERE email = ?",
    [email],
    async (err, results) => {
      if (err) {
        console.error("Database error:", err);
        return res.status(500).json({ error: "Database error" });
      }

      if (results.length === 0) {
        return res.status(401).json({ error: "Invalid email or password" });
      }

      const user = results[0];

      // Compare provided password with hashed password
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(401).json({ error: "Invalid email or password" });
      }

      // Step 2: Generate JWT on successful login
      // You can use a secret from .env or hardcode for now
      const token = jwt.sign(
        { id: user.id, username: user.username, email: user.email },
        process.env.JWT_SECRET || process.env.JWT_SECRET, // Use env secret or fallback
        { expiresIn: "1h" } // Token expires in 1 hour
      );

      // Successful login
      res.status(200).json({
        message: "Login successful",
        token, // Send the token to the client
        user: { id: user.id, username: user.username, email: user.email },
      });
    }
  );
};

const getAllUsers = (req, res) => {
  connection.query("select * from register", (err, rows) => {
    if (err) throw err;
    res.json(rows);
  });
};

const deleteUser = (req, res) => {
  const userId = req.params.id;

  connection.query(
    "DELETE FROM register WHERE id = ?",
    [userId],
    (err, results) => {
      if (err) {
        console.error("Error deleting user:", err);
        return res.status(500).json({ error: "Database error" });
      }
      if (results.affectedRows === 0) {
        return res.status(404).json({ error: "User not found" });
      }
      res.status(200).json({ message: "User deleted successfully" });
    }
  );
};

const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const { username, email, password } = req.body;

    // If password is provided, hash it
    let hashedPassword = null;
    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
    }

    // Build the update query dynamically
    let updateQuery = "UPDATE register SET ";
    let updateValues = [];
    let updateFields = [];

    if (username) {
      updateFields.push("username = ?");
      updateValues.push(username);
    }
    if (email) {
      updateFields.push("email = ?");
      updateValues.push(email);
    }
    if (hashedPassword) {
      updateFields.push("password = ?");
      updateValues.push(hashedPassword);
    }

    if (updateFields.length === 0) {
      return res.status(400).json({ error: "No fields to update" });
    }

    updateQuery += updateFields.join(", ") + " WHERE id = ?";
    updateValues.push(userId);

    connection.query(updateQuery, updateValues, (err, results) => {
      if (err) {
        console.error("Error updating user:", err);
        return res.status(500).json({ error: "Database error" });
      }
      if (results.affectedRows === 0) {
        return res.status(404).json({ error: "User not found" });
      }
      res.status(200).json({ message: "User updated successfully" });
    });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

const getUserById = (req, res) => {
  const userId = req.params.id;

  connection.query(
    "SELECT id, username, email FROM register WHERE id = ?",
    [userId],
    (err, results) => {
      if (err) {
        console.error("Error fetching user:", err);
        return res.status(500).json({ error: "Database error" });
      }
      if (results.length === 0) {
        return res.status(404).json({ error: "User not found" });
      }
      res.status(200).json(results[0]);
    }
  );
};

module.exports = {
  saveRegistration,
  loginUser,
  getAllUsers,
  deleteUser,
  updateUser,
  getUserById,
};
