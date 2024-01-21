CREATE OR ALTER PROCEDURE getNotice
AS
BEGIN
    --fetch rows that are not over 14 days old
    SELECT * FROM Notice
    WHERE DATEDIFF(day, created_at, GETDATE()) <= 14
END;