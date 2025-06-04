CREATE DATABASE IF NOT EXISTS test_task_db;
CREATE USER IF NOT EXISTS 'app_user'@'%' IDENTIFIED WITH 'caching_sha2_password' BY 'strong_password';
GRANT ALL ON test_task_db.* TO 'app_user'@'%';
FLUSH PRIVILEGES;
