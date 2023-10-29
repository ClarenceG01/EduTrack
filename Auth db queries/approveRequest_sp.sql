CREATE OR ALTER PROCEDURE approveRequest
    @email varchar(200),
    @registration_no varchar(200),
    @phone varchar(200)
AS
BEGIN
    -- check if from parent table if the email or phone number matches the registration number
    IF EXISTS(
        SELECT *
        FROM Parent
        WHERE (email = @email 
        AND phone_number = @phone 
        AND registration_no = @registration_no)
    )
    BEGIN
        UPDATE Request SET isApproved = 1 WHERE email = @email
    END
END





