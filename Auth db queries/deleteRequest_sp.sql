CREATE OR ALTER PROCEDURE deleteRequest
@email varchar(200),
@registration_no varchar(200),
@phone_number varchar(200)
AS
BEGIN
    DELETE FROM Request WHERE email = @email
    INSERT INTO Pending(email,registration_no,phone_number) VALUES(@email,@registration_no,@phone_number)
END