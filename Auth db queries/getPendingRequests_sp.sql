CREATE OR ALTER PROCEDURE getPendingRequests
AS
BEGIN
    SELECT email, registration_no, phone_number, sent_at AS request_time 
    FROM Pending
END