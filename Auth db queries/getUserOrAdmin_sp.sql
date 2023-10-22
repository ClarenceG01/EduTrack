CREATE OR ALTER PROCEDURE getUserOrAdmin
    @email VARCHAR(200),
    @pwd VARCHAR(600),
    @username VARCHAR(200),
    @registration_no VARCHAR(200)
AS
BEGIN
    IF @email IS NOT NULL OR @registration_no IS NOT NULL
    BEGIN
        SELECT * FROM Users WHERE email = @email OR registration_no = @registration_no;
    END

    IF @username IS NOT NULL
    BEGIN
        SELECT * FROM Admin WHERE username = @username;
    END
END
