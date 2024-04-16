CREATE OR ALTER PROCEDURE getUnit
@unitCode VARCHAR(10)
AS
BEGIN
    SELECT unit_name FROM Unit WHERE unit_code = @unitCode
END;
