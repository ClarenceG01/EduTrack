CREATE OR ALTER PROCEDURE addStudent
    @registration_no VARCHAR(100),
    @first_name VARCHAR(100),
    @last_name VARCHAR(100),
    @year VARCHAR(100)
AS
BEGIN
    INSERT INTO Student (registration_no, first_name, last_name, year_of_study)
    VALUES (@registration_no, @first_name, @last_name, @year);
END;