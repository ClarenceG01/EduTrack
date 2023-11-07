CREATE OR ALTER PROCEDURE addAdmin
    @username varchar(200),
    @pwd varchar(600),
    @phone varchar(200)
AS
BEGIN
    INSERT INTO Admin (username, pwd, phone_number) VALUES (@username, @pwd, @phone)
END





