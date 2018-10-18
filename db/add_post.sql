INSERT INTO content (user_id, title, body, date, category)
VALUES($1, $2, $3, $4, $5);
SELECT * FROM content