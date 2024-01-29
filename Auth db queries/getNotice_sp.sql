CREATE OR ALTER PROCEDURE getNotice
AS
BEGIN
    --fetch rows that are not over 14 days old
    SELECT notice_title,file_path,notice_body,created_at,file_type,file_name
    FROM Notice
    WHERE DATEDIFF(day, created_at, GETDATE()) <= 14
END;