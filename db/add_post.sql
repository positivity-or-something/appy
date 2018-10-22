INSERT INTO content
    (user_id, title, body, date, category, image, tags)
VALUES($1, $2, $3, $4, $5, $6, $7);
SELECT *
FROM content