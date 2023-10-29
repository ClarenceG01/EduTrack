CREATE OR ALTER PROCEDURE addRequest
    @email varchar(200),
    @registration_no varchar(200),
    @phone varchar(200)
AS
BEGIN
    INSERT INTO Request(email, registration_no, phone_number) VALUES(@email, @registration_no, @phone)
END


