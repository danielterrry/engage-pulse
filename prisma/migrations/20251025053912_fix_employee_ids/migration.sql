-- Imagine a previous migration ruined the employee_id values
-- so need to update all affected employees
UPDATE survey_responses r
SET r.employee_id =
	(SELECT e.id
   FROM employees e
   INNER JOIN users u ON e.user_id = u.id);