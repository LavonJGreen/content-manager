DROP TABLE IF EXISTS department;
DROP TABLE IF EXISTS role;
DROP TABLE IF EXISTS employee;
DROP TABLE IF EXISTS manager;

CREATE TABLE department (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    department VARCHAR(30) NOT NULL UNIQUE
);

-- The role table nam eis red but still works as intended not sure why its red
CREATE TABLE role (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL UNIQUE,
    salary DECIMAL NOT NULL,
    department_name VARCHAR(30) NOT NULL,
    CONSTRAINT fk_department FOREIGN KEY (department_name) REFERENCES department(department)
);
CREATE TABLE manager (
    id INT PRIMARY KEY AUTO_INCREMENT,
    manager_name VARCHAR(30) NOT NULL UNIQUE,
    department_name VARCHAR(30) NOT NULL,
    CONSTRAINT fk_department_manger FOREIGN KEY (department_name) REFERENCES department(department)
);

CREATE TABLE employee (
    id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_name VARCHAR(30) NOT NULL,
    manager_name VARCHAR (30),
    CONSTRAINT fk_role FOREIGN KEY (role_name) REFERENCES role(title),
    CONSTRAINT fk_manager_name FOREIGN KEY (manager_name) REFERENCES manager(manager_name)
);