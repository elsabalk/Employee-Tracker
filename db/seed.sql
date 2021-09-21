'SELECT emp.id, emp.first_name, emp.last_name, role.title, role.salary, department.name as department, emp.manager_id as manager FROM employee_db.employee AS emp, employee_db.role as role, 
employee_db.department as department WHERE emp.role_id = role.id and role.department_id = department.id';

'SELECT emp.id, emp.first_name, emp.last_name, role.title, role.salary, department.name as department, emp.manager_id as manager FROM employee_db.employee AS emp, employee_db.role as role, 
employee_db.department as department WHERE emp.role_id = role.id and role.department_id = department.id order by department_id';

'SELECT emp.id, emp.first_name, emp.last_name, role.title, role.salary, department.name as department, emp.manager_id as manager FROM employee_db.employee AS emp, employee_db.role as role, employee_db.department as department WHERE emp.role_id = role.id and role.department_id = department.id order by manager_id';

'INSERT INTO employee_db.employee values ('${answers.id}', '${answers.firstName}', '${answers.lastName}', ${answers.roleId}, ${answers.managerId})';

'DELETE from employee_db.employee where id = '${answers.id}'`';

'UPDATE employee_db.employee set role_id ='${answers.roleId}' where id= '${answers.employeeId}'`';

'INSERT INTO employee_db.department values('${answers.departmentId}','${answers.departmentName}', 0);`';