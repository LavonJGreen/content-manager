const inquirer = require('inquirer');

const mysql = require('mysql2');
 
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Lavon240723$$$$',
  database: 'employee'
});

 let department = [];
 let employeeSelection = [];
 let manager = [];
 let role = [];

const selections = 
["View All Department", 
"View All Employees", 
"View All Role", 
"Add A Department", 
"Add A Role", 
"Add An Employee", 
"Update An Employee Role",
/*"Exit"*/
]
function Prompt() {

    return inquirer
        .prompt(
            {
                type: 'list',
                name: 'selection',
                message: 'What would you like to do?',
                choices: selections
            }
        )
        .then(({selection}) => {
            if (selection === selections[0]) {
                console.log('You have selected to view all departments')

                connection.promise().query('SELECT * FROM department')
                    .then( ([rows, fields]) => {
                        console.table(rows);
                        Prompt();
                    })
            }
            else if (selection === selections[1]) {
                console.log('You have slected to view all employees')
                connection.promise().query('SELECT * FROM employee')
                    .then( ([rows, fields]) => {
                        console.table(rows);
                        Prompt();
                    })            
            } else if (selection === selections[2]) {
                console.log('You have selected to view all employee role')
                connection.promise().query('SELECT * FROM role')
                    .then( ([rows, fields]) => {
                        console.table(rows);
                        Prompt();
                    })            
            } else if (selection === selections[3]) {
                console.log('You have selected to add a new department')
                return inquirer
                    .prompt({
                        type: 'text',
                        name: 'department',
                        message: 'What is the name of the department?'
                    }).then(({department}) => {
                        console.log(department)
                        connection.promise().query(
                            'INSERT INTO department SET ?',
                            {
                                department: department
                            }
                        )
                        Prompt();
                    })
            } else if (selection === selections[4]) {
                console.log('You have selected to add a new employee role')
                connection.promise().query('SELECT * FROM department')
                    .then( ([rows]) => {
                        for (let i = 0; i < rows.length; i++) {
                            department.push(rows[i].department) 
                        }
                    })
                return inquirer
                    .prompt([{
                        type: 'text',
                        name: 'role',
                        message: 'What is the role?'
                    },
                    {
                        type: 'text',
                        name: 'salary',
                        message: 'What is the salary for this role?'
                    },
                    {
                        type: 'list',
                        name: 'department',
                        message: 'What department is this role apart of?',
                        choices: department
                    }
                    ]).then(({role, salary, department}) => {
                        console.log(role, salary, department)
                        connection.promise().query(
                            'INSERT INTO role SET ?',
                            {
                                title: role,
                                salary: salary,
                                department_name: department
                            }
                        )
                        Prompt();
                    })
            } else if (selection === selections[5]) {
                console.log('You have selected to add a new employee')
                connection.promise().query('SELECT title FROM role')
                    .then( ([rows]) => {
                        for (let i = 0; i < rows.length; i++) {
                            role.push(rows[i].title) 
                        }
                    })       
                connection.promise().query('SELECT manager_name FROM manager')
                    .then( ([rows]) => {
                        for (let i = 0; i < rows.length; i++) {
                            manager.push(rows[i].manager_name) 
                        }
                    })       
                    return inquirer
                    .prompt([{
                        type: 'text',
                        name: 'firstName',
                        message: "What is the employee's first name?"
                    },
                    {
                        type: 'text',
                        name: 'lastName',
                        message: "What is the employee's last name?"
                    },
                    {
                        type: 'list',
                        name: 'role',
                        message: "What is the employee's role?",
                        choices: role
                    },
                    {
                        type: 'list',
                        name: 'manager',
                        message: "Who is the employee's manager?",
                        choices: manager
                    }
                    ]).then(({firstName, lastName, role, manager}) => {
                        console.log(firstName, lastName, role, manager)
                        connection.promise().query(
                            'INSERT INTO employee SET ?',
                            {
                                first_name: firstName,
                                last_name: lastName,
                                role_name: role,
                                manager_name: manager
                            }
                        )
                        Prompt();
                    })
            } else if (selection === selections[6]) {
                console.log('You have slected to update an employee role')
                async function update() {
                     let employeeName = connection.promise().query('SELECT first_name, last_name FROM employee')
                        .then( ([rows]) => {
                            for (let i = 0; i < rows.length; i++) {
                                let first = rows[i].first_name
                                let last = rows[i].last_name
                                employeeSelection.push(first + ' ' + last) 
                            }
                        })   
                        let employeeRole = connection.promise().query('SELECT title FROM role')
                            .then( ([rows]) => {
                                for (let i = 0; i < rows.length; i++) {
                                    role.push(rows[i].title) 
                                }
                            })
                        await employeeName, employeeRole

                        return inquirer
                            .prompt([{
                                type: 'list',
                                name: 'employee',
                                message: "Choose an employee to update.",
                                choices: employeeSelection
                            },
                            {
                                type: 'list',
                                name: 'role',
                                message: "What is the employee's new role?",
                                choices: role
                            }])
                            .then(({employee, role}) => {
                                console.log(employee, role);
                                Prompt();
                            })
                }
                update();
                
                    
            }

        })
        
}


Prompt();