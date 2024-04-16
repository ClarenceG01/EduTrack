CREATE OR ALTER PROCEDURE AddResult
    @registration_number VARCHAR(100),
    @UnitCode VARCHAR(100),
    @Score INT,
    @Grade CHAR(1)
AS
BEGIN
    DECLARE @SemesterName VARCHAR(50)
    DECLARE @StudentID UNIQUEIDENTIFIER
    -- Get the semester name corresponding to the unit code
    SELECT @SemesterName = semester_name
    FROM Unit
    WHERE unit_code = @UnitCode

    -- Get the student ID based on the provided name
    SELECT @StudentID = student_id
    FROM Student
    WHERE registration_no = @registration_number

    PRINT @SemesterName
    PRINT @StudentID
    -- Insert the result into the Results table
    INSERT INTO Results (semester_name,student_id, unit_code, Score, Grade)
    VALUES (@SemesterName,@StudentID, @UnitCode, @Score, @Grade)
END;