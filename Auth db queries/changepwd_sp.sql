CREATE OR ALTER PROCEDURE changePassword
    @id varchar(200),
    @new_pwd varchar(600)
AS
BEGIN
    UPDATE Users SET pwd = @new_pwd, pwd_changed = 1 WHERE users_id= @id
END

