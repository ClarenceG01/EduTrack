CREATE OR ALTER PROCEDURE getNoOfUsers
AS
BEGIN
    SELECT COUNT(*) AS Total_Users from Users
END;
