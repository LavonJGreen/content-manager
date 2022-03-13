INSERT INTO department (department)
VALUES ('Development'), ('Design'), ('Deployment'), ('DevRel');

INSERT INTO role (title, salary, department_name)
VALUES ('Designer', 100000.00, 'Design'),
        ('Web Developer', 160000.00, 'Development'),
        ('Deployment Engineer', 140000.00, 'Deployment'),
        ('Developer Relations', 200000.00, 'DevRel');

INSERT INTO manager (manager_name, department_name)
VALUES ('Lavon Green', 'Development'),
        ('Janisha Gerald', 'Design'),
        ('Jamal Richard', 'Deployment'),
        ('Jamie Morris', 'DevRel');

INSERT INTO employee (first_name, last_name, role_name, manager_name)
VALUES ('Vivienne', 'Verde', 'Web Developer', 'Lavon Green'),
        ('Virgil', 'Greenlief', 'Designer', 'Janisha Gerald'),
        ('Noval', 'Grenich', 'Deployment Engineer', 'Jamal Richard'),
        ('Anastasia', 'Greenburg', 'Developer Relations', 'Jamie Morris');