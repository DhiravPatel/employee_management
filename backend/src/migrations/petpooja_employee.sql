CREATE DATABASE IF NOT EXISTS petpooja_employee;

USE petpooja_employee;

CREATE TABLE IF NOT EXISTS department (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    status ENUM('active', 'inactive') DEFAULT 'active',
    created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    modified TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS employee (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    dob DATE,
    phone VARCHAR(15),
    photo VARCHAR(255),
    email VARCHAR(255),
    salary DECIMAL(10, 2),
    status ENUM('active', 'inactive') DEFAULT 'active',
    department_id INT,
    created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    modified TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (department_id) REFERENCES department(id)
);

INSERT INTO department (name, status) VALUES
('Engineering', 'active'),
('Human Resources', 'active'),
('Sales', 'active'),
('Marketing', 'inactive'),
('Finance', 'active'),
('IT', 'active'),
('Legal', 'inactive'),
('Customer Support', 'active'),
('Product Management', 'active'),
('Operations', 'inactive');

INSERT INTO employee (department_id, name, dob, phone, photo, email, salary, status) VALUES
(1, 'Alice Johnson', '1985-04-10', '123-456-7890', 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 'alice.johnson@example.com', 75000.00, 'active'),
(1, 'Bob Smith', '1990-05-15', '123-456-7891', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dXNlcnxlbnwwfHwwfHx8MA%3D%3D', 'bob.smith@example.com', 95000.00, 'active'),
(2, 'Charlie Davis', '1992-02-20', '123-456-7892', 'https://images.unsplash.com/photo-1639149888905-fb39731f2e6c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8dXNlcnxlbnwwfHwwfHx8MA%3D%3D', 'charlie.davis@example.com', 50000.00, 'active'),
(3, 'David Brown', '1980-03-30', '123-456-7893', 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 'david.brown@example.com', 85000.00, 'inactive'),
(4, 'Eve White', '1988-07-25', '123-456-7894', 'https://images.unsplash.com/photo-1546961329-78bef0414d7c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHVzZXJ8ZW58MHx8MHx8fDA%3D', 'eve.white@example.com', 60000.00, 'active'),
(5, 'Frank Green', '1995-08-10', '123-456-7895', 'https://images.unsplash.com/flagged/photo-1573740144655-bbb6e88fb18a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHVzZXJ8ZW58MHx8MHx8fDA%3D', 'frank.green@example.com', 70000.00, 'active'),
(6, 'Grace Black', '1991-12-01', '123-456-7896', 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHVzZXJ8ZW58MHx8MHx8fDA%3D', 'grace.black@example.com', 110000.00, 'inactive'),
(7, 'Hannah Wilson', '1987-11-05', '123-456-7897', 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHVzZXJ8ZW58MHx8MHx8fDA%3D', 'hannah.wilson@example.com', 130000.00, 'active'),
(6, 'Isabella Moore', '1993-01-25', '123-456-7898', 'https://images.unsplash.com/photo-1586297135537-94bc9ba060aa?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHVzZXJ8ZW58MHx8MHx8fDA%3D', 'isabella.moore@example.com', 55000.00, 'active'),
(4, 'Kevin Martinez', '1990-09-12', '123-456-7900', 'https://plus.unsplash.com/premium_photo-1688350808212-4e6908a03925?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjV8fHVzZXJ8ZW58MHx8MHx8fDA%3D', 'kevin.martinez@example.com', 78000.00, 'active'),
(1, 'Lily Perez', '1989-02-28', '123-456-7901', 'https://images.unsplash.com/photo-1557862921-37829c790f19?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjZ8fHVzZXJ8ZW58MHx8MHx8fDA%3D', 'lily.perez@example.com', 82000.00, 'active'),
(2, 'Mason Clark', '1992-03-10', '123-456-7902', 'https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjd8fHVzZXJ8ZW58MHx8MHx8fDA%3D', 'mason.clark@example.com', 55000.00, 'inactive');
