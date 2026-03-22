CREATE DATABASE login;

USE login;


select*from users;
-- describe users;
-- drop table users;
-- CREATE TABLE users (
--     id INT AUTO_INCREMENT PRIMARY KEY,
--     firstname VARCHAR(50) NOT NULL,
--     lastname VARCHAR(50) NOT NULL,
--     email VARCHAR(100) UNIQUE NOT NULL,
--     phonenum VARCHAR(15) UNIQUE NOT NULL,
--     role ENUM('Teacher','Student') NOT NULL,
--     password VARCHAR(255) NOT NULL
-- );
-- CREATE TABLE teachers (
--     teacher_id INT AUTO_INCREMENT PRIMARY KEY,
--     user_id INT NOT NULL,
--     email VARCHAR(100) UNIQUE NOT NULL,
--      password VARCHAR(255) NOT NULL
--     FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
-- );
-- select*from teachers;
drop table teachers;
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    firstname VARCHAR(50) NOT NULL,
    lastname VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    phonenum VARCHAR(15) UNIQUE NOT NULL,
    role ENUM('Teacher','Student') NOT NULL,
    password VARCHAR(255) NOT NULL
);

ALTER TABLE users DROP INDEX phonenum;

CREATE TABLE teachers (
    teacher_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE students (
    student_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    firstname VARCHAR(50),
    lastname VARCHAR(50),
    email VARCHAR(100),
    phonenum VARCHAR(15),
    password VARCHAR(255),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
select*from teachers;
select*from students;
select*from courses;

drop table courses;
drop table teachers;

CREATE TABLE course (
    course_id INT AUTO_INCREMENT PRIMARY KEY,
    id INT NOT NULL, 
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    teacher_name VARCHAR(100) NOT NULL,
    standard VARCHAR(50) NOT NULL,
    video_path VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id) REFERENCES users(id) ON DELETE CASCADE
);
select*from course;
select*from teachers;
CREATE TABLE quiz_scores (
    id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT NOT NULL,
    teacher_id INT NOT NULL,
    score INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (teacher_id) REFERENCES teachers(teacher_id) ON DELETE CASCADE,
     FOREIGN KEY (student_id) REFERENCES students(student_id) ON DELETE CASCADE
    
);
drop table quiz_scores;


CREATE TABLE quizzes (
    quiz_id INT AUTO_INCREMENT PRIMARY KEY,
  --   teacher_id INT NOT NULL, 
    title VARCHAR(255) NOT NULL,
    standard VARCHAR(50) NOT NULL,
    questions JSON NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   --  FOREIGN KEY (teacher_id) REFERENCES teachers(teacher_id) ON DELETE CASCADE
);

CREATE TABLE quiz_scores (
    id INT NOT NULL,
    quiz_id INT NOT NULL,
    score INT NOT NULL,
    FOREIGN KEY (quiz_id) REFERENCES quizzes(quiz_id) ON DELETE CASCADE,
    FOREIGN KEY (id) REFERENCES users(id) ON DELETE CASCADE
);