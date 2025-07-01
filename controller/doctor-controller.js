// const mysql = require('mysql2')
// const connection = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: '7554',
//   database: 'demo'
// })

const connection = require("../db/db");



const saveDoctor=(req, res) => {
  connection.query('insert into doctors (name, age, address, email) values(?, ?, ?, ?)',[
    req.body.name,
    req.body.age,
    req.body.address,
    req.body.email
  ], (err, rows) => {
  if (err) throw err
  res.json(rows);
})
}
const deleteDoctor=(req, res) => {
  const { id } = req.params;
  connection.query('delete from doctors where id = ?', [id], (err, rows) => {
    if (err) throw err
    res.json(rows);
  })
}   
const getAllDoctors=(req, res) => {
  connection.query('select * from doctors', (err, rows) => {
    if (err) throw err
    res.json(rows);
  })
}
const updateDoctor=(req, res) => {
  connection.query('update doctors set name = ?, age = ?, address = ?, email = ? where id = ?', [
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
  saveDoctor,
  deleteDoctor,
  getAllDoctors,
  updateDoctor
}