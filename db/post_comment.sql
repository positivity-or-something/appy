INSERT INTO comments
    (user_id, content_id, comment_body, date)
VALUES($1, $2, $3, $4);
SELECT *
FROM comments