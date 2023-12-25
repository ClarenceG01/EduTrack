CREATE OR ALTER PROCEDURE getAdmin
@admin_id varchar(200)
AS
BEGIN
    SELECT * FROM Admin WHERE admin_id = @admin_id
END;
