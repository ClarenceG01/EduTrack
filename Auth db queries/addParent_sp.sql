CREATE OR ALTER PROCEDURE addParent
    @first_name VARCHAR(100),
    @last_name VARCHAR(100),
    @phone_number VARCHAR(100),
    @email VARCHAR(100),
    @registration_no VARCHAR(100)
AS
BEGIN
    INSERT INTO parent (first_name, last_name, phone_number, email, registration_no)
    VALUES (@first_name, @last_name, @phone_number, @email, @registration_no);
END;
