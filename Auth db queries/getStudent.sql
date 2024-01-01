CREATE OR ALTER PROCEDURE getStudent
    @student_id varchar(200)
AS
BEGIN
    SELECT S.*, P.first_name AS p_f_name, P.last_name AS p_l_name, P.phone_number AS p_phone, P.email AS p_email
    FROM Student AS S
        INNER JOIN Parent AS P
        ON S.registration_no = P.registration_no
    WHERE S.student_id = @student_id;
END;


