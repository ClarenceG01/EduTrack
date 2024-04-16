CREATE OR ALTER PROCEDURE getParent
    @registration_number VARCHAR(100)
AS
BEGIN
    SELECT * 
    FROM Parent
    WHERE registration_no = @registration_number
END;