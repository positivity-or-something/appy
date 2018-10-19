DELETE FROM comments WHERE content_id = $1;
DELETE FROM rep WHERE content_id = $1;
DELETE FROM content WHERE id = $1;
SELECT * FROM content;