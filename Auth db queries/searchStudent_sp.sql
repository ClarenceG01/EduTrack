CREATE OR ALTER PROCEDURE searchStudent
@search varchar(200)
AS
BEGIN
    SELECT *
    FROM Student
    WHERE first_name COLLATE SQL_Latin1_General_CP1_CI_AI LIKE '%' + @search + '%'
        OR last_name COLLATE SQL_Latin1_General_CP1_CI_AI LIKE '%' + @search + '%'
        OR registration_no COLLATE SQL_Latin1_General_CP1_CI_AI LIKE '%' + @search + '%' 
END;
