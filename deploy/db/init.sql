-- Create the test database
CREATE DATABASE IF NOT EXISTS hackdawg_testing;

-- Create the test user
CREATE USER 'hackdawg_testing'@'%' IDENTIFIED BY 'password';
GRANT CREATE, ALTER, INDEX, LOCK TABLES, REFERENCES, UPDATE, DELETE, DROP, SELECT, INSERT ON `hackdawg_testing`.* TO 'hackdawg_testing'@'%';
FLUSH PRIVILEGES;
