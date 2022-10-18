const inquirer = require('inquirer');
const mysql = require('mysql2');
const db = require('./db/connection');
// require('console.table');

const mainMenu = async () => {
    const promptValue = await inquirer.prompt([
        {
            type: 'list',
            name: 'choice',
            message: 'What would you like to do?',
            choices: [
                {
                    name: 'View All Employees',
                    value: 'VIEW_EMPLOYEES',
                },
                {
                    name: 'View All Roles',
                    value: 'VIEW_ROLES',
                },
                {
                    name: 'View All Departments',
                    value: 'VIEW_DEPARTMENTS',
                },
                {
                    name: 'Add an Employee',
                    value: 'ADD_EMPLOYEE',
                },
                {
                    name: 'Add a Role',
                    value: 'ADD_ROLE',
                },
                {
                    name: 'Add a department',
                    value: 'ADD_DEPARTMENT',
                },
                {
                    name: "Update an employee's role",
                    value: 'UPDATE_ROLE',
                },
                {
                    name: "Update an Employee's manager",
                    value: 'UPDATE_EMPLOYEE_MANAGER',
                },
                {
                    name: 'View employees by manager',
                    value: 'VIEW_EMPLOYEE_BY_MANAGER'
                },
                {
                    name: "View employees by department",
                    value: "VIEW_EMPLOYEE_BY_DEPARTMENT"
                },
                {
                    name: 'EXIT',
                    value: "EXIT"
                }
            ]
        }
    ])

switch (promptValue.choice) {
    case "VIEW_EMPLOYEES":
        viewEmpolyees();
        break;
    case "VIEW_ROLES":
        viewRoles();
        break;
    case "VIEW_DEPARTMENTS":
        viewDepartments();
        break;
    case "ADD_EMPLOYEE":
        addEmployee();
        break;
    case "ADD_ROLE":
        addRole();
        break;
    case "ADD_DEPARTMENT":
        addDepartment();
        break;
    case "UPDATE_ROLE":
        updateRole();
        break;
    case "UPDATE_EMPLOYEE_MANAGER":
        updateEmployeeManager();
        break;
    case "VIEW_EMPLOYEE_BY_MANAGER":
        viewEmployeeByManager();
        break;
    case "VIEW_EMPLOYEE_BY_DEPARTMENT":
        viewEmployeeByDepartment();
        break;
    case "EXIT":
        process.exit();
    default:
        process.exit();
}
};








mainMenu();