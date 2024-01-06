CREATE OR ALTER PROCEDURE getYearlyResult
    @student_id varchar(200)
AS
BEGIN
    -- Get the average score for each year (Year 1, Year 2, Year 3, Year 4)
    SELECT AVG(CAST(score AS DECIMAL(10, 2))) AS avg_score, 
           CASE 
               WHEN semester_name IN ('1.1', '1.2') THEN 'Year 1'
               WHEN semester_name IN ('2.1', '2.2') THEN 'Year 2'
               WHEN semester_name IN ('3.1', '3.2') THEN 'Year 3'
               WHEN semester_name IN ('4.1', '4.2') THEN 'Year 4'
               ELSE 'Unknown Year' -- Handle other cases if present
           END AS year_group
    FROM Results
    WHERE student_id = @student_id
    GROUP BY 
        CASE 
            WHEN semester_name IN ('1.1', '1.2') THEN 'Year 1'
            WHEN semester_name IN ('2.1', '2.2') THEN 'Year 2'
            WHEN semester_name IN ('3.1', '3.2') THEN 'Year 3'
            WHEN semester_name IN ('4.1', '4.2') THEN 'Year 4'
            ELSE 'Unknown Year' -- Handle other cases if present
        END;
END;
SELECT * FROM results   WHERE student_id = 'c07922d6-064c-467d-8a29-97a0316787fd'AND semester_name = '1.2';
EXEC getYearlyResult '70562e70-aa03-4c61-9946-212dbf26e8e1';