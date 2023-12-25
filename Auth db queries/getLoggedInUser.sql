CREATE OR ALTER PROCEDURE getLoggedInUser
    @users_id varchar(200)
AS
BEGIN 
    SELECT * FROM Users
    INNER JOIN Student ON Users.registration_no = Student.registration_no
    WHERE Users.users_id = @users_id
END;




    

