CREATE OR ALTER PROCEDURE getAdminMessages
AS
BEGIN
    SELECT DISTINCT u.email,m.sender_id,u.registration_no,COUNT(*) as unread_messages
    FROM user_messages m
    INNER JOIN Admin 
    ON m.receiver_id = Admin.admin_id
    INNER JOIN Users u
    ON m.sender_id = u.users_id
    WHERE isRead = 0
    GROUP BY u.email,u.registration_no,m.sender_id;
END;