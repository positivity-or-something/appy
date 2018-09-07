INSERT INTO users (authid) VALUES ($1);
SELECT * FROM users WHERE authid = $1;