CREATE OR ALTER PROCEDURE getEachSemesterUnitsAverage
@semester_name VARCHAR(50)
AS
BEGIN
    SELECT U.unit_name,AVG(score) as average_score,R.unit_code
    FROM Results R
    JOIN Unit U
    ON R.unit_code = U.unit_code
    WHERE U.semester_name=@semester_name
    GROUP BY U.unit_name, R.unit_code
END
