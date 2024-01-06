CREATE OR ALTER PROCEDURE getStudentId
    @user_id varchar(200)
AS
BEGIN
    SELECT S.student_id
    FROM Users AS U
    INNER JOIN Student AS S
    ON U.registration_no = S.registration_no
    WHERE U.users_id = @user_id;
END;