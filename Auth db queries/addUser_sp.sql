CREATE OR ALTER PROCEDURE addUser
    @email varchar(200),
    @pwd varchar(600),
    @registration_no varchar(200),
    @phone varchar(200)
AS
BEGIN
    INSERT INTO Users (email, pwd, registration_no, phone_number) VALUES (@email, @pwd, @registration_no, @phone)
END

EXEC addUser 'gatama001@gmail.com', 'euijnfejindf', 'C026-01-0675/2020', '0748444199'


