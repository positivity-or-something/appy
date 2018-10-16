SELECT * FROM content c 
LEFT JOIN rep r ON c.id = r.content_id 
WHERE c.id = $1