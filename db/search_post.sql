SELECT *
from content
Where body
ILIKE '%'|| $1|| '%'; 