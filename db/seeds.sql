USE employees;

INSERT INTO department (name)
VALUES
("Sales"),
("IT"),
("Legal"),
("Engineering"),
("Finance");

INSERT INTO role (title, salary, department_id)
VALUES
("Sales Lead", 75000, 1),
("IT Support", 1000000, 2),
("Lawyer", 30000000, 3),
("Engineer", 150000, 4),
("Accountant", 51000, 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
("Alex", "Chen", 1, NULL),
("Lindsay", "Reiner", 2, NULL),
("Caleb", "Crum", 1, 1),
("David", "Dowell", 4, NULL),
("Kay", "Pevey", 3, NULL),
("Matthew", "Anderson", 3, 5), 
("Elliot", "Bell", 2, 5),
("Chuck", "Bass", 5, 5),
("Jesse", "Cumbest", 5, NULL);