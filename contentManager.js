const inquirer = require('inquirer');

const mysql = require('mysql2');
 
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Lavon240723$$$$',
  database: 'employee'
});


