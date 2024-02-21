CREATE OR ALTER PROCEDURE adminApproveRequest
@email VARCHAR(50),
@pwd VARCHAR(50),
@registration_no VARCHAR(50),
@phone_number VARCHAR(50)
AS
BEGIN
     IF EXISTS (SELECT * FROM parent WHERE registration_no = @registration_no)
    BEGIN
        INSERT INTO Users(email,pwd,registration_no,phone_number)
        VALUES(@email,@pwd,@registration_no,@phone_number)

        DELETE FROM Pending
        WHERE email = @email OR phone_number = @phone_number
    END
END

