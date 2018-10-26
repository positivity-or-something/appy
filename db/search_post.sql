Select c.id, c.title, c.category, c.image, c.body, c.user_id, c.date, c.show_content, tags, 
u.id AS user_id, u.first_name, u.email, u.image_url, u.user_name, u.pass_word, u.interests
FROM content c
JOIN users u ON c.user_id = u.id
Where body
ILIKE '%'|| $1|| '%'
OR tags 
ILIKE '%'|| $1|| '%';