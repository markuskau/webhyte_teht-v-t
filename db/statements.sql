
/* Creating ExerciseLogs table */

CREATE TABLE ExerciseLogs (
    exercise_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    exercise_date DATE NOT NULL,
    exercise_type VARCHAR(100) NOT NULL,
    duration_minutes INT NOT NULL,
    calories_burned INT,
    notes TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

/* Iserting data to exerciselogs */

MariaDB [HealthDiary]> INSERT INTO ExerciseLogs
    -> (user_id, exercise_date, exercise_type, duration_minutes, calories_burned, notes)
    -> VALUES
    -> (1, '2026-01-28', 'Running', 35, 350, 'Morning run'),
    -> (2, '2026-01-28', 'Gym', 60, 500, 'Chest workout'),
    -> (3, '2026-01-28', 'Cycling', 45, 400, 'Outdoor cycling');


/* Query (user check own training) */

MariaDB [HealthDiary]> SELECT exercise_date, exercise_type, duration_minutes, calories_burned
    -> FROM ExerciseLogs
    -> WHERE user_id = 1
    -> ORDER BY exercise_date DESC;

/* Query (workouts in week) */

MariaDB [HealthDiary]> SELECT exercise_type, duration_minutes
    -> FROM ExerciseLogs
    -> WHERE user_id = 1
    -> AND exercise_date BETWEEN '2026-01-20' AND '2026-01-28';

/* Update (User fix error) */

MariaDB [HealthDiary]> UPDATE ExerciseLogs
    -> SET duration_minutes = 40
    -> WHERE exercise_id = 1;

/* Update (add note) */

MariaDB [HealthDiary]> UPDATE ExerciseLogs
    -> SET notes = 'Felt great, increased pace'
    -> WHERE exercise_id = 1;

/* Delete (user delete note) */

MariaDB [HealthDiary]> DELETE FROM ExerciseLogs
    -> WHERE exercise_id = 3;

