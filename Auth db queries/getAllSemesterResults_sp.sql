CREATE OR ALTER PROCEDURE getAllSemesterResults
    @student_id varchar(200)
AS
BEGIN
    SELECT U.unit_name,R.unit_code,R.score,R.semester_name
    FROM Results AS R
    INNER JOIN Unit AS U
    ON R.unit_code = U.unit_code
    WHERE R.student_id = @student_id
    ORDER BY R.semester_name;
END;


