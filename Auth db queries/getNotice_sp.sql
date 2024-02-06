CREATE OR ALTER PROCEDURE getNotice
AS
BEGIN
    --fetch rows that are not over 14 days old and sort them in order of most recent
    SELECT TOP 10 * FROM Notice WHERE DATEDIFF(day, created_at, GETDATE()) <= 14 ORDER BY created_at DESC;
END;