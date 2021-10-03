USE employee_db;

INSERT INTO department (department_name)
VALUES 
('Management'),
('IT'),
('Maintenance'),
('Accounting');

INSERT INTO role(title, salary, department_id)
VALUES
('Software Eng', 150000, 2),
('QA', 80000, 2),
('Business Analyst', 75000, 2),
('Backend Administrator', 135000, 3),
('Finance Administrator', 75000, 4),
('Manager', 200000, 1);


INSERT INTO employee(first_name, last_name, role_id) 
VALUES
('Jimmy', 'John', 1),
('Frank', 'Sinatra', 2),
('Pappa', 'Murphy', 3),
('Jenna', 'Will', 1),
('Peng', 'Flash', 5),
('Randell', 'Sunny', 4);

UPDATE `employee_db`.`employee` SET `manager_id` = '1' WHERE (`id` > '1');