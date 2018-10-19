INSERT INTO comments
    ( user_id, content_id, comment_body, show_comment)
VALUES($1, $2, $3, TRUE);
SELECT *
FROM comments