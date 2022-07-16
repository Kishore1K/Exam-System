CREATE DATABASE EXAM;

-- USE
USE  EXAM;

-- 0 . DEPT
create table Dept (
  id int primary key auto_increment,
  Name varchar(15)
);



-- 1.STUDENT 



create table student (
    STDID varchar(15),
    NAME varchar(50),
    EMAIL varchar(50),
    DEPT  varchar(15),
    PHONE varchar(15),
    GENDER enum('Male', 'Female', 'Other'),
    DOB varchar(15),
    PASSWORD varchar(255),
    primary key (EMAIL)
);

-- 2.STAFF
create table staff (
    staffid varchar(15),
    Name varchar(50),
    phno varchar(15),
    mail varchar(50),
    gender enum('Male', 'Female', 'Other'),
    DOB varchar(15),
    dept varchar(15),
    password varchar(255),
    primary key(mail)
);

-- 3.QUIZ
drop table if exists quiz ;
create table quiz (
    quizid varchar(15) primary key,
    Name varchar(30),
    MAIL varchar(50),
    status enum('0', '1'),
    FOREIGN KEY (MAIL) REFERENCES staff(mail) on delete cascade

);

-- 4.QUESTIONS
drop table if exists questions ;

-- ALTER TABLE questions ADD FOREIGN KEY(quizid) REFERENCES quiz (quizid) on delete cascade
create table questions (
    id int primary key  auto_increment,
    question varchar(255),
    op1 varchar(50),
    op2 varchar(50),
    op3 varchar(50),
    op4 varchar(50),
    answer varchar(50),
    quizid varchar(15)
);

-- 5. EXAM
-- ALTER TABLE exam ADD FOREIGN KEY(quizid) REFERENCES quiz (quizid) on delete cascade;
create table exam (
    slno int auto_increment,
    quizid varchar(15),
    mail varchar(50),
    primary key (slno, quizid, mail),
    FOREIGN KEY (quizid) REFERENCES quiz(quizid) on delete cascade,
    FOREIGN KEY (mail) REFERENCES student(EMAIL) on delete cascade
);

-- 6. SCORE
-- ALTER TABLE score ADD FOREIGN KEY(quizid) REFERENCES quiz (quizid) on delete cascade;
create table score (
    slno int  auto_increment,
    quizid varchar(15),
    score int,
    mail varchar(50),
    remarks varchar(25),
    total int ,
    primary KEY (slno,quizid, mail), 
    FOREIGN KEY (quizid) REFERENCES quiz(quizid) on delete cascade,
    FOREIGN KEY (mail) REFERENCES student(EMAIL) on delete cascade

);

--
-- Triggers `quiz`
--
DROP TRIGGER IF EXISTS ondeleteqs;
DELIMITER //
CREATE TRIGGER ondeleteqs AFTER DELETE ON quiz
 FOR EACH ROW delete from questions where questions.quizid=old.quizid
//
DELIMITER ;




--
-- Triggers score
--
DROP TRIGGER IF EXISTS remarks;
DELIMITER //
CREATE TRIGGER remarks before INSERT ON score
 FOR EACH ROW set NEW.remarks = if(NEW.score =0, 'BAD', if(NEW.score = NEW.total, 'GOOD', 'AVERAGE'))
//
DELIMITER ;

