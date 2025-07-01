// const mysql = require('mysql2')
// const connection = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: '7554',
//   database: 'demo'
// })

const connection = require("../db/db");


const saveBooks = (req, res) => {
  connection.query('insert into books (title, author, published_year, user_id) values(?, ?, ?, ?)',[
    req.body.title,
    req.body.author,
    req.body.published_year,
    req.body.user_id
  ], (err, rows) => {
  if (err) throw err
  res.json(rows);
})
}


const deleteBooks = (req, res) => {
  connection.query('delete from books where id = ?', [req.params.id], (err, rows) => {
    if (err) throw err
    res.json(rows);
  })
}

const getAllBooks = (req, res) => {
  connection.query('select * from books', (err, rows) => {
    if (err) throw err
    res.json(rows);
  })
}

const updateBooks = (req, res) => {
  connection.query('update books set title = ?, author = ?, published_year = ?, user_id = ? where id = ?', [
    req.body.title,
    req.body.author,
    req.body.published_year,
    req.body.user_id,
    req.params.id
  ], (err, rows) => {
  if (err) throw err
  res.json(rows);
})
}



module.exports = {
  saveBooks,
  deleteBooks,
  getAllBooks,
  updateBooks
}
