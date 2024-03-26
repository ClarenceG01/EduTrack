CREATE OR ALTER PROCEDURE searchUser
    @searchQuery VARCHAR(200)
AS
BEGIN
    SELECT users_id AS sender_id,*
    FROM Users
    WHERE registration_no COLLATE SQL_Latin1_General_CP1_CI_AI LIKE '%' + @searchQuery + '%'
        OR email COLLATE SQL_Latin1_General_CP1_CI_AI LIKE '%' + @searchQuery + '%';
END;