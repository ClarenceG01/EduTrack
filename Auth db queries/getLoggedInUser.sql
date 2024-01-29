CREATE OR ALTER PROCEDURE getLoggedInUser
    @users_id varchar(200)
AS
BEGIN 
    SELECT U.users_id, U.email, U.registration_no, U.phone_number, S.profile_pic, S.first_name, S.last_name, S.year_of_study,S.student_id
    FROM Users AS U
    INNER JOIN Student AS S
    ON U.registration_no = S.registration_no
    WHERE U.users_id = @users_id
END;




    

