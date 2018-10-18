INSERT INTO users(user_name, pass_word, first_name, email, image_url)
VALUES ($1, $2, $3, $4, $5);
SELECT * FROM users WHERE user_name = $1