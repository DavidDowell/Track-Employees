const inquirer = require('inquirer');
const mysql = require('mysql2');
const db = require('./db/connection');
// require('console.table');

console.log(`%c
        
 /$$$$$$$$                         /$$                                                  
 | $$_____/                        | $$                                                  
 | $$       /$$$$$$/$$$$   /$$$$$$ | $$  /$$$$$$  /$$   /$$  /$$$$$$   /$$$$$$   /$$$$$$$
 | $$$$$   | $$_  $$_  $$ /$$__  $$| $$ /$$__  $$| $$  | $$ /$$__  $$ /$$__  $$ /$$_____/
 | $$__/   | $$ \ $$ \ $$| $$  \ $$| $$| $$  \ $$| $$  | $$| $$$$$$$$| $$$$$$$$|  $$$$$$ 
 | $$      | $$ | $$ | $$| $$  | $$| $$| $$  | $$| $$  | $$| $$_____/| $$_____/ \____  $$
 | $$$$$$$$| $$ | $$ | $$| $$$$$$$/| $$|  $$$$$$/|  $$$$$$$|  $$$$$$$|  $$$$$$$ /$$$$$$$/
 |________/|__/ |__/ |__/| $$____/ |__/ \______/  \____  $$ \_______/ \_______/|_______/ 
                         | $$                     /$$  | $$                              
                         | $$                    |  $$$$$$/                              
                         |__/                     \______/                               
 `, "font-family:monospace"                                
);

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
    case "EXIT":
        process.exit();
    default:
        process.exit();
}
};

const viewEmpolyees = async () => {
    const [employeeData] = await db.query(
        `SELECT employee.id,
        employee.first_name,
        employee.last_name,
        role.title,
        department.name AS department,
        role.salary,
        CONCAT (manager.first_name, " ", manager.last_name) AS manager
        FROM EMPLOYEE
        LEFT JOIN role ON employee.role_id = role.id
        LEFT JOIN department ON role.department_id = department.id
        LEFT JOIN employee manager ON employee.manager_id = manager.id`
        );
        console.table(employeeData);
        mainMenu();
};

const viewDepartments = async () => {
    const[departmentData] = await db.query(`SELECT * FROM department`);
    console.table(departmentData);
    mainMenu();
};

const viewRoles = async () => {
    const [roleData] = await db.query(
        `SELECT role.id,
        role.title AS job_title,
        department.name AS department,
        role.salary FROM role
        LEFT JOIN department ON role.department_id = department.id
        `
    );
    console.table(roleData);
    mainMenu();
};

const addEmployee = async () => {
    console.log('------REFERENCE--------')
    const [roleData] = await db.query (`SELECT role.id,
    role.title AS job_title,
    department.name AS department,
    role.salary FROM role
    LEFT JOIN department ON role.department_id = department.id
    `);
    console.table(roleData);
    const promptValue = await inquirer.prompt ([
        {
            type: 'text',
            name: 'first_name',
            message: "What is the employee's first name?"
        },
        {
            type: 'text',
            name: 'last_name',
            message: "What is the employee's last name?"
        },
        {
            
            type: 'int',
            name: 'role',
            message: 'Using the table above choose a role id number for this employee.'
        },
    ]);

    const [employeeData] = await db.query (`SELECT * FROM employee`);
    console.table(employeeData);

    const promptValue2 = await inquirer.prompt ([
        {
            type: 'int',
            name: 'manager',
            message: "Choose their manager using the corresponding id number in the table above."
        }
    ])

    const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`;
    const params = [
        promptValue.first_name,
        promptValue.last_name,
        promptValue.role,
        promptValue2.manager
    ];

    db.query(sql, params, (err, result) => {
        if (err) {
            console.log(err);
            return;
        }
    })
    console.log("Employee has been added!");
    mainMenu();
};

const addRole = async () => {
    const promptValue = await inquirer.prompt ([
        {
            type: 'text',
            name: 'name',
            message: 'What is the name of the role?'
        },
        {
            type: 'int',
            name: 'salary',
            message: 'What is the salary for this role?'
        },
        {
            type: 'int',
            name: 'department',
            message: 'What is the department this role falls under? (choose department by id number)'
        }
    ]);

    const sql = `INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`;

    const params = [
        promptValue.name,
        promptValue.salary,
        promptValue.department
    ];

    db.query(sql, params, (err, result) => {
        if (err) {
            console.log(err);
            return;
        }
    })
    console.log('A new role has been added!');
    mainMenu();
};

const addDepartment = async () => {
    const promptValue = await inquirer.prompt ([
        {
            type: 'text',
            name: 'name',
            message: 'What is the name of the department?'
        }
    ]);

    const sql = `INSERT INTO department (name) VALUES (?)`;
    const params = promptValue.name;

    db.query(sql, params, (err, result) => {
        if (err) {
            console.log(err);
            return;
        }
    });
    console.log("A new department has been added!");
    mainMenu();
};

const updateRole = async () => {
    const [employeeData] = await db.query (`SELECT * FROM employee`);
    console.table(employeeData);

    const promptValue = await inquirer.prompt ([
        {
            type: 'int',
            name: 'employee_id',
            message: "Using the table above, input the employee's id number you wish to update."
        }
    ]);

    const [roleData] = await db.query(`SELECT * FROM role`);
    console.table(roleData);
    
    const promptValue2 = await inquirer.prompt([
        {
            type: 'int',
            name: 'role_id',
            message: "Using the table above, input the role id number you would like to assign the employee."
        }
    ]);

    const sql = `UPDATE employee SET role_id = ? WHERE id = ?`;
    const params = [
        promptValue2.role_id,
        promptValue.employee_id
    ];

    db.query(sql, params, (err, result) => {
        if (err) {
            console.log(err);
            return;
        }
    })
    console.log("The role of the employee was updated!");
    mainMenu();
};

const updateEmployeeManager = async () => {
    const [employeeData] = await db.query(`SELECT * FROM employee`);
    console.table(employeeData);

  const promptValue = await inquirer.prompt([
    {
      type: "text",
      name: "employee_id",
      message:
        "Looking at the table above, please input the employee's id number you wish to update their manager.",
    },
    {
      type: "int",
      name: "manager_id",
      message:
        "Input the manager's id number you would like to assign to this employee",
    },
  ]);

  const sql = `UPDATE employee SET manager_id = ? WHERE id = ?`;

  const params = [promptValue.manager_id, promptValue.employee_id];

  db.query(sql, params, (err, result) => {
    if (err) {
      console.log(err);
      return;
    }
  });
  console.log("Employee's manager was updated!");
  mainMenu();
};



mainMenu();