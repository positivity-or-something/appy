INSERT INTO content (user_id, title, body, date, category, image)
VALUES($1, $2, $3, $4, $5, $6);
SELECT * FROM content