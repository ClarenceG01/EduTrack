CREATE OR ALTER PROCEDURE addNotice
    @notice_title varchar(200),
    @notice_body varchar(max),
    @file_path varchar(max),
    @file_type varchar(max),
    @file_name varchar(max)
AS
BEGIN
    INSERT INTO Notice(notice_title, notice_body, file_path, file_type ,file_name)
    VALUES(@notice_title, @notice_body, @file_path,@file_type,@file_name)
END;

