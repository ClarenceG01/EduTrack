CREATE OR ALTER PROCEDURE Test
    @credential varchar(200),
    @pwd varchar(600)
AS
BEGIN
    -- First query to search in the "Users" table
    SELECT * FROM Users WHERE email = @credential OR registration_no = @credential OR phone_number = @credential;

    -- Second query to search in the "Admin" table
    SELECT * FROM Admin WHERE username = @credential OR phone_number = @credential;
END