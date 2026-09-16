BEGIN;
INSERT INTO authors (name, email, bio) VALUES
  ('Ana Torres', 'ana@example.com', 'Autora de tecnología.'),
  ('Carlos Ruiz', 'carlos@example.com', 'Autor invitado.')
ON CONFLICT (email) DO NOTHING;

INSERT INTO posts (title, content, author_id, published)
SELECT 'Bienvenidos a MiniBlog', 'Esta es la primera publicación del proyecto.', id, TRUE
FROM authors WHERE email = 'ana@example.com'
AND NOT EXISTS (SELECT 1 FROM posts WHERE title = 'Bienvenidos a MiniBlog');
INSERT INTO comments (post_id, author_id, content)
SELECT p.id, a.id, '¡Excelente primera publicación!' FROM posts p CROSS JOIN authors a
WHERE p.title='Bienvenidos a MiniBlog' AND a.email='carlos@example.com'
AND NOT EXISTS (SELECT 1 FROM comments WHERE content='¡Excelente primera publicación!');
COMMIT;
