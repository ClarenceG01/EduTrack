--sp to get the resultrs of loggined user
CREATE OR ALTER PROCEDURE getUserResults
    @users_id varchar(200)
AS
BEGIN 
    SELECT R.results_id,R.student_id,R.semester_name,R.unit_code,R.score,R.grade
    FROM Student AS S
    INNER JOIN Users AS U
    ON U.registration_no = S.registration_no
    INNER JOIN Results AS R
    ON S.student_id = R.student_id
    WHERE U.users_id = @users_id
END;