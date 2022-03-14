const inquirer = require('inquirer');

const mysql = require('mysql2');
 
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Lavon240723$$$$',
  database: 'employee'
});

 

const selection = 
["View All Departments", 
"View All Employees", 
"View All Roles", 
"Add A Department", 
"Add A Role", 
"Add An Employee", 
"Update An Employee Role"
]
