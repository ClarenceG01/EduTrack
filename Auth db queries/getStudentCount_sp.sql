CREATE OR ALTER PROCEDURE getStudentCount
AS
BEGIN
    SELECT COUNT(*) AS StudentCount
    FROM Student;
END;