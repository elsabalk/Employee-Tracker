// List the dependencies here.
const mysql = require('mysql2');
const inquirer = require('inquirer');
const util = require('util');


// Connection info per local DB instance 
let connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'employee_db'

});

// Connects to local DB and logs connection status
connection.connect(function(err) {
    if (err) {
        console.error('error connecting: ' + err);
        return;
    }

    console.log('You have connected to DB using ' + connection.threadId);
    initialAction();
});


// Query DB and return all employees currently in the employee DB
const viewAllEmployees = async () => {
    console.log('User selected view all employee logic');
    let employeeArray = [];

    let query = 'SELECT emp.id, emp.first_name AS "First Name", emp.last_name AS "Last Name", IFNULL(r.title, "No Data") AS "Title", IFNULL(d.department_name, "No Data") AS "Department", r.salary AS "Salary", CONCAT(m.first_name," ",m.last_name) AS "Manager" FROM employee emp LEFT JOIN role r ON r.id = emp.role_id LEFT JOIN department d ON d.id = r.department_id LEFT JOIN employee m ON m.id = emp.manager_id ORDER BY emp.id';
    connection.query(query, function(err, res) {
        if (err) throw err;

        // Foreach to store query data
        res.forEach(employee => employeeArray.push(employee));

        // Display on output
        console.table(employeeArray);
    });

    initialAction();
};


// Query DB and return all employees by department categorized
const viewAllEmpByDepartment = async () => {
    console.log('User selected view all employees by department logic');
    let employeeArray = [];

    let query = 'SELECT e.first_name AS "First Name", e.last_name AS "Last Name", r.title, d.department_name AS "Department" FROM employee e INNER JOIN role r ON r.id = e.role_id INNER JOIN department d ON d.id = r.department_id order by department_name';

    connection.query(query, function(err, res) {
        if (err) throw err;

        // Foreach to store query data
        res.forEach(employee => employeeArray.push(employee));

        // Display on output
        console.table(employeeArray);
    });

    initialAction();
};


// Query DB and return all employees by  manager
const viewAllEmpByManager = async () => {
    console.log('User selected view all employees by department logic');
    let employeeArray = [];

    let query = 'SELECT CONCAT(e.first_name," " ,e.last_name) AS full_name, r.title, e.manager_id FROM employee e INNER JOIN role r ON r.id = e.role_id';
    connection.query(query, function(err, res) {
        if (err) throw err;

         // Foreach to store query data
        res.forEach(employee => employeeArray.push(employee));

        // Display on output
        console.table(employeeArray);
    });

    initialAction();
};


// Add an employee record based on user input
const addEmpRecord = () => {

    return inquirer.prompt([{
            type: 'input',
            name: 'id',
            message: 'What is the employee\'s ID?',
        },
        {
            type: 'input',
            name: 'firstName',
            message: 'What is the employee\'s first name?',
        },
        {
            type: 'input',
            name: 'lastName',
            message: 'What is the employee\'s last name?',
        },
        {
            type: 'input',
            name: 'roleId',
            message: 'What is the employee\'s role id?',
        },
        {
            type: 'input',
            name: 'managerId',
            message: 'What is the employee\'s manager id?',
        }

    ]).then(answers => {

        let sqlQuery = connection.query(`INSERT INTO employee_db.employee values ('${answers.id}', '${answers.firstName}', '${answers.lastName}', ${answers.roleId}, ${answers.managerId})`);
        console.log(`The employee record '${answers.firstName}' '${answers.lastName}' has been added`);

        initialAction();
    })
};


// Delete record based on employee id
const deleteEmployeeRecord = () => {
    return inquirer.prompt([{
            type: 'input',
            name: 'id',
            message: 'What is the employee\'s ID?',
        }

    ]).then(answers => {

        let sqlQuery = connection.query(`DELETE from employee_db.employee where id = '${answers.id}'`);
        console.log(`The employee record '${answers.id}' has been deleted`);
        initialAction();
    })
};


// Update an employee record based on user input
const updateEmployeeRole = () => {
    return inquirer.prompt([{

            type: 'input',
            name: 'employeeId',
            message: 'What is the employee\'s id?',
        },
        {
            type: 'input',
            name: 'roleId',
            message: 'What is the employee\'s new role ID?',
        }

    ]).then(answers => {

        let sqlQuery = connection.query(`UPDATE employee_db.employee set role_id ='${answers.roleId}' where id= '${answers.employeeId}'`);
        console.log(`The employee  id '${answers.employeeId}' has been updated with new role id '${answers.roleId}'`);
        initialAction();
    })
};

// Add a department based on user input
const addADepartment = () => {
    return inquirer.prompt([{

            type: 'input',
            name: 'departmentId',
            message: 'What is the department\'s id?',
        },
        {
            type: 'input',
            name: 'departmentName',
            message: 'What is the department\'s name?',
        }

    ]).then(answers => {

        let sqlQuery = connection.query(`INSERT INTO employee_db.department values('${answers.departmentId}','${answers.departmentName}');`);
        console.log(`The department id '${answers.departmentId}' has been created with name '${answers.departmentName}'`);
        initialAction();
    })
};


// App startup questions
const initialAction = async () => {
    try {
        let answer = await inquirer.prompt({
            name: 'action',
            type: 'list',
            message: 'What would you like to do?',
            choices: [
                'View All Employees',
                'View All Employees By Department',
                'View All Employees By Manager',
                'Add Employee',
                'Remove Employee',
                'Update Employee Role',
                'Add A Department',
                'Quit'
            ]
        });

        switch (answer.action) {
            case 'View All Employees':
                viewAllEmployees();
                break;

            case 'View All Employees By Department':
                viewAllEmpByDepartment();
                break;

            case 'View All Employees By Manager':
                viewAllEmpByManager();
                break;
                6
            case 'Add Employee':
                addEmpRecord();
                break

            case 'Remove Employee':
                deleteEmployeeRecord();
                break

            case 'Update Employee Role':
                updateEmployeeRole();
                break

            case 'Add A Department':
                addADepartment();
                break

            case 'Quit':
                connection.end();
                console.log('GoodBye')
                break;
        };
    } catch (err) {
        console.log(err);
    };

}