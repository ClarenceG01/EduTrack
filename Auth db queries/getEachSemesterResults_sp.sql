CREATE OR ALTER PROCEDURE getEachSemesterResults
    @student_id varchar(200),
    @semester_name varchar(200)
AS
BEGIN
    SELECT U.unit_name,R.unit_code,R.score
    FROM Results AS R
    INNER JOIN Unit AS U
    ON R.unit_code = U.unit_code
    WHERE R.student_id = @student_id AND R.semester_name = @semester_name;
END;
