CREATE OR ALTER PROCEDURE userSendMessage
    @sender_id UNIQUEIDENTIFIER,
    @receiver_id UNIQUEIDENTIFIER,
    @message_body VARCHAR(MAX)
AS
BEGIN
    INSERT INTO user_messages(sender_id, receiver_id, message_body)
    VALUES(@sender_id, @receiver_id, @message_body)
END