CREATE OR ALTER PROCEDURE adminSendMessage
    @sender_id UNIQUEIDENTIFIER,
    @receiver_id UNIQUEIDENTIFIER,
    @message_body VARCHAR(MAX)
AS
BEGIN
    INSERT INTO admin_messages(sender_id, receiver_id, message_body)
    VALUES(@sender_id, @receiver_id, @message_body)
END