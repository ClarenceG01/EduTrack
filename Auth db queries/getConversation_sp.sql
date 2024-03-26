CREATE OR ALTER PROCEDURE GetMessagesBySenderId
    @senderId UNIQUEIDENTIFIER
AS
BEGIN
    SELECT 
        'user' AS sender_type,
        user_messages_id AS message_id,
        sender_id AS sender,
        receiver_id AS receiver,
        message_body,
        sent_at,
        isRead
    FROM 
        user_messages
    WHERE 
        sender_id = @senderId
    
    UNION ALL
    
    SELECT 
        'admin' AS sender_type,
        admin_messages_id AS message_id,
        sender_id AS sender,
        receiver_id AS receiver,
        message_body,
        sent_at,
        isRead
    FROM 
        admin_messages
    WHERE 
        receiver_id = @senderId
    
    ORDER BY sent_at; -- Sorting by sent_at column
END;


EXEC GetMessagesBySenderId 'ca1c691e-3ee1-423e-bfce-d8d42bb4b203'