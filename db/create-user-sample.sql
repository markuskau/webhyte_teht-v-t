CREATE USER 'healthdiary'@'localhost' IDENTIFIED BY 'salasana';
GRANT ALL PRIVILEGES ON `HealthDiary`.* TO 'healthdiary'@'localhost';
FLUSH PRIVILEGES;