const mysql = require('mysql2');
 

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: './assets/db/employee.db'
});

module.exports = mysql