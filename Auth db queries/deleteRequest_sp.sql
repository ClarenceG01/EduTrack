CREATE OR ALTER PROCEDURE deleteRequest
@email varchar(200)
AS
BEGIN
    DELETE FROM Request WHERE email = @email
END