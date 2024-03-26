CREATE OR ALTER PROCEDURE getSingleUserMessages
    @registration_no VARCHAR(200),
    @email VARCHAR(200)
AS
BEGIN
    SELECT m.sender_id,m.receiver_id,m.message_body,m.sent_at,u.email,u.registration_no
    FROM user_messages m
    INNER JOIN Users u
    ON m.sender_id = u.users_id
    WHERE u.registration_no = @registration_no AND u.email = @email;
END;

EXEC getSingleUserMessages 'C026-01-0675/2020','gatama001@gmail.com'