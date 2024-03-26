--DIRT

-- DROP ALL TABLES
-- Path: drop tables.sql
DROP TABLE Student;
DROP TABLE Users;
DROP TABLE Admin;
DROP TABLE Notice
DROP TABLE Pending
DROP TABLE Messages;
--SELECT ALL TABLES
-- Path: select tables.sql
SELECT * FROM Student;
SELECT * FROM Users;
SELECT * FROM Admin;
SELECT * FROM Parent;
SELECT * FROM Request;
SELECT * FROM Pending;
SELECT * FROM Notice;
SELECT * FROM Messages;

DELETE FROM Notice WHERE notice_id = '788f995e-dd52-4fb4-ba33-12399845bf8d'
DELETE FROM Pending
DELETE FROM Request WHERE email = 'gc7651263@gmail.com'
DELETE FROM Users WHERE email = 'marybrown@gmail.com'
DELETE FROM Parent WHERE email='mary.brown@email.com'
INSERT INTO Parent (first_name, last_name, phone_number, email,registration_no)
 VALUES ('Mary', 'Brown', '0746576839', 'marybrown@gmail.com','C026-01-0680/2020')

INSERT INTO Parent (first_name, last_name, phone_number, email,registration_no)
 VALUES ('Mr', 'Naivasha', '0746575839', 'patrick.naivasha@dkut.ac.ke','C026-01-0682/2020')
 UPDATE 

SELECT * FROM Admin
DELETE FROM parent WHERE email = 'dwilliams@gmail.com'

-- INSERT INTO Student (registration_no, profile_pic, first_name, last_name, year_of_study)
-- VALUES
--     ('C026-01-0676/2020', 'pic2.jpg', 'John', 'Doe', '2.2'),
--     ('C026-01-0677/2020', 'pic3.jpg', 'Alice', 'Smith', '4.1'),
--     ('C026-01-0678/2020', 'pic4.jpg', 'Bob', 'Johnson', '1.3'),
--     ('C026-01-0679/2020', 'pic5.jpg', 'Ella', 'Brown', '2.1'),
--     ('C026-01-0680/2020', 'pic6.jpg', 'David', 'Williams', '3.2'),
--     ('C026-01-0681/2020', 'pic7.jpg', 'Grace', 'Taylor', '4.2'),
--     ('C026-01-0682/2020', 'pic8.jpg', 'James', 'Lee', '1.1'),
--     ('C026-01-0683/2020', 'pic9.jpg', 'Sophia', 'Martin', '2.3'),
--     ('C026-01-0684/2020', 'pic10.jpg', 'Oliver', 'Anderson', '3.3');

-- Inserting dummy data into Semester_exam table
INSERT INTO Semester_exam (semester_name)
VALUES
    ('1.1'),
    ('1.2'),
    ('2.1'),
    ('2.2'),
    ('3.1'),
    ('3.2'),
    ('4.1'),
    ('4.2')
    

-- Inserting dummy data into Unit table
INSERT INTO Unit (unit_name, unit_code,semester_name)
VALUES
    ('Introduction for Computer Science', 'CCS1101','1.1'),
    ('Discrete Mathematics', 'SMA1105','1.1'),
    ('Foundation of Computational Mathematics', 'SMA1100','1.1'),
    ('Claculus I', 'SMA1117','1.1'),
    ('Electricity and Magnetism', 'SPH1113','1.1'),
    ('Gender,HIV/AIDS and substance use', 'HNS1100','1.1'),
    ('Claculus II', 'SMA1218','1.2'),
    ('Probability and Statistics I', 'SAS1201','1.2'),
    ('General Economics', 'BEC2110','1.2'),
    ('Computer Organization and Architecture', 'CCS1202','1.2'),
    ('Electronics', 'EEE1221','1.2'),
    ('Probability and Statistics II','SAS2102','2.1'),
    ('Database Systems','CCS2101','2.1'),
    ('Data Structure and Algorithms','CCS2102','2.1'),
    ('Operating Systems','CCS2103','2.1'),
    ('Digital logic','CCS2104','2.1'),
    ('Programming Languages','CCS2105','2.1'),
    ('System Analysis and Desgin','CCS2106','2.1'),
    ('Vector Analysis','SMA2215','2.2'),
    ('Internet Application Programming','CCS2207','2.2'),
    ('Computer Graphics','CCS2208','2.2'),
    ('Computer Networks','CCS2209','2.2'),
    ('Knowledge Representation and Reasoning','CCS2210','2.2'),
    ('Object Oriented Programming','CCS2211','2.2'),
    ('Artificial Intelligence','CCS3101','3.1'),
    ('Design and Analysis of Algorithm','CCS3102','3.1'),
    ('Distributed Systems','CCS3103','3.1'),
    ('Theory of Computing','CCS3104','3.1'),
    ('Systems Programming','CCS3105','3.1'),
    ('Software Engineering','CCS3106','3.1'),
    ('Compiler construction','CCS3207','3.2'),
    ('Multimedia systems','CCS3208','3.2'),
    ('Simulation and modeling','CCS3209','3.2'),
    ('Research methods in computer science','CCS3210','3.2'),
    ('Mobile application programming','CCS3211','3.2'),
    ('Human Computer Interaction','CCS4101','4.1'),
    ('Machine Learning','CCS4102','4.1'),
    ('Computer Security','CCS4103','4.1')



INSERT INTO results (semester_name, student_id, unit_code, score, grade)
VALUES
    -- Semester 1.1
    ('1.1', 'c07922d6-064c-467d-8a29-97a0316787fd', 'CCS1101',50, 'C'),
    ('1.1', 'c07922d6-064c-467d-8a29-97a0316787fd', 'SMA1105',76, 'A'),
    ('1.1', 'c07922d6-064c-467d-8a29-97a0316787fd', 'SMA1100',66 , 'B'),
    ('1.1', 'c07922d6-064c-467d-8a29-97a0316787fd', 'SMA1117',98 , 'A'),
    ('1.1', 'c07922d6-064c-467d-8a29-97a0316787fd', 'SPH1113', 74, 'A'),
    ('1.1', 'c07922d6-064c-467d-8a29-97a0316787fd', 'HNS1100',83 , 'A'),
    -- Add entries for all units for Semester 1.1 with respective scores and grades

    -- Semester 1.2
    ('1.2', 'c07922d6-064c-467d-8a29-97a0316787fd', 'SMA1218',74, 'A'),
    ('1.2', 'c07922d6-064c-467d-8a29-97a0316787fd', 'SAS1201',64, 'B'),
    ('1.2', 'c07922d6-064c-467d-8a29-97a0316787fd', 'BEC2110',74, 'A'),
    ('1.2', 'c07922d6-064c-467d-8a29-97a0316787fd', 'CCS1202',81, 'A'),
    ('1.2', 'c07922d6-064c-467d-8a29-97a0316787fd', 'EEE1221',48, 'D'),
    -- Add entries for all units for Semester 1.2 with respective scores and grades

    -- Semester 2.1
    ('2.1', 'c07922d6-064c-467d-8a29-97a0316787fd', 'SAS2102', 75, 'A'),
    ('2.1', 'c07922d6-064c-467d-8a29-97a0316787fd', 'CCS2101', 53, 'C'),
    ('2.1', 'c07922d6-064c-467d-8a29-97a0316787fd', 'CCS2102', 75, 'A'),
    ('2.1', 'c07922d6-064c-467d-8a29-97a0316787fd', 'CCS2103', 81, 'A'),
    ('2.1', 'c07922d6-064c-467d-8a29-97a0316787fd', 'CCS2104', 49, 'D'),
    -- Add entries for all units for Semester 2.1 with respective scores and grades

    -- Semester 2.2
    ('2.2', 'c07922d6-064c-467d-8a29-97a0316787fd', 'SMA2215',55 , 'C'),
    ('2.2', 'c07922d6-064c-467d-8a29-97a0316787fd', 'CCS2207',74, 'A'),
    ('2.2', 'c07922d6-064c-467d-8a29-97a0316787fd', 'CCS2208',46, 'D'),
    ('2.2', 'c07922d6-064c-467d-8a29-97a0316787fd', 'CCS2209', 49, 'D'),
    ('2.2', 'c07922d6-064c-467d-8a29-97a0316787fd', 'CCS2210', 58, 'C'),
    -- Add entries for all units for Semester 2.2 with respective scores and grades

    -- Semester 3.1
    ('3.1', 'c07922d6-064c-467d-8a29-97a0316787fd', 'CCS3101',65, 'C'),
    ('3.1', 'c07922d6-064c-467d-8a29-97a0316787fd', 'CCS3102',44, 'D'),
    ('3.1', 'c07922d6-064c-467d-8a29-97a0316787fd', 'CCS3103',56, 'C'),
    ('3.1', 'c07922d6-064c-467d-8a29-97a0316787fd', 'CCS3104',76, 'A'),
    ('3.1', 'c07922d6-064c-467d-8a29-97a0316787fd', 'CCS3105',80, 'A'),
    -- Add entries for all units for Semester 3.1 with respective scores and grades

    -- Semester 3.2
    ('3.2', 'c07922d6-064c-467d-8a29-97a0316787fd', 'CCS3106',65 , 'C'),
    ('3.2', 'c07922d6-064c-467d-8a29-97a0316787fd', 'CCS3207', 47, 'D'),
    ('3.2', 'c07922d6-064c-467d-8a29-97a0316787fd', 'CCS3208', 94, 'A'),
    ('3.2', 'c07922d6-064c-467d-8a29-97a0316787fd', 'CCS3209', 73, 'A'),
    ('3.2', 'c07922d6-064c-467d-8a29-97a0316787fd', 'CCS3210', 59, 'C'),
    -- Add entries for all units for Semester 3.2 with respective scores and grades

    -- Semester 4.1
    ('4.1', 'c07922d6-064c-467d-8a29-97a0316787fd', 'CCS4101', 56, 'C'),
    ('4.1', 'c07922d6-064c-467d-8a29-97a0316787fd', 'CCS4102', 75, 'A'),
    ('4.1', 'c07922d6-064c-467d-8a29-97a0316787fd', 'CCS4103', 66, 'B')
    -- Add entries for all units for Semester 4.1 with respective scores and grades



SELECT * FROM Semester_exam;
SELECT * FROM Unit;
SELECT * FROM Student;
SELECT * FROM results;
INSERT INTO Student(registration_no, first_name, last_name, year_of_study)
VALUES
    ('C026-01-0677/2021', 'Peter', 'Doe', '1.1')


INSERT INTO results (semester_name, student_id, unit_code, score, grade)
VALUES
    -- Semester 1.1
    ('1.1', '70562e70-aa03-4c61-9946-212dbf26e8e1', 'CCS1101',85, 'A'),
    ('1.1', '70562e70-aa03-4c61-9946-212dbf26e8e1', 'SMA1105',72, 'B'),
    ('1.1', '70562e70-aa03-4c61-9946-212dbf26e8e1', 'SMA1100',66, 'B'),
    ('1.1', '70562e70-aa03-4c61-9946-212dbf26e8e1', 'SMA1117',94, 'A'),
    ('1.1', '70562e70-aa03-4c61-9946-212dbf26e8e1', 'SPH1113',78, 'A'),
    ('1.1', '70562e70-aa03-4c61-9946-212dbf26e8e1', 'HNS1100',88, 'A'),
    -- Add entries for all units for Semester 1.1 with respective scores and grades

    -- Semester 1.2
    ('1.2', '70562e70-aa03-4c61-9946-212dbf26e8e1', 'SMA1218',78, 'A'),
    ('1.2', '70562e70-aa03-4c61-9946-212dbf26e8e1', 'SAS1201',65, 'C'),
    ('1.2', '70562e70-aa03-4c61-9946-212dbf26e8e1', 'BEC2110',78, 'A'),
    ('1.2', '70562e70-aa03-4c61-9946-212dbf26e8e1', 'CCS1202',83, 'A'),
    ('1.2', '70562e70-aa03-4c61-9946-212dbf26e8e1', 'EEE1221',54, 'D'),
    -- Add entries for all units for Semester 1.2 with respective scores and grades

    -- Semester 2.1
    ('2.1', '70562e70-aa03-4c61-9946-212dbf26e8e1', 'SAS2102', 78, 'A'),
    ('2.1', '70562e70-aa03-4c61-9946-212dbf26e8e1', 'CCS2101', 56, 'C'),
    ('2.1', '70562e70-aa03-4c61-9946-212dbf26e8e1', 'CCS2102', 78, 'A'),
    ('2.1', '70562e70-aa03-4c61-9946-212dbf26e8e1', 'CCS2103', 83, 'A'),
    ('2.1', '70562e70-aa03-4c61-9946-212dbf26e8e1', 'CCS2104', 54, 'D'),
    -- Add entries for all units for Semester 2.1 with respective scores and grades

    -- Semester 2.2
    ('2.2', '70562e70-aa03-4c61-9946-212dbf26e8e1', 'SMA2215',65 , 'C'),
    ('2.2', '70562e70-aa03-4c61-9946-212dbf26e8e1', 'CCS2207',78, 'A'),
    ('2.2', '70562e70-aa03-4c61-9946-212dbf26e8e1', 'CCS2208',48, 'D'),
    ('2.2', '70562e70-aa03-4c61-9946-212dbf26e8e1', 'CCS2209', 54, 'D'),
    ('2.2', '70562e70-aa03-4c61-9946-212dbf26e8e1', 'CCS2210', 63, 'C'),
    -- Add entries for all units for Semester 2.2 with respective scores and grades

    -- Semester 3.1
    ('3.1', '70562e70-aa03-4c61-9946-212dbf26e8e1', 'CCS3101',72, 'B'),
    ('3.1', '70562e70-aa03-4c61-9946-212dbf26e8e1', 'CCS3102',48, 'D'),
    ('3.1', '70562e70-aa03-4c61-9946-212dbf26e8e1', 'CCS3103',60, 'C'),
    ('3.1', '70562e70-aa03-4c61-9946-212dbf26e8e1', 'CCS3104',78, 'A'),
    ('3.1', '70562e70-aa03-4c61-9946-212dbf26e8e1', 'CCS3105',82, 'A');
    -- Add entries for all units for Semester 3.1 with respective scores and grades

