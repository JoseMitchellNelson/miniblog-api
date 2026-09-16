BEGIN;

CREATE TABLE IF NOT EXISTS authors (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL CHECK (char_length(trim(name)) > 0),
  email VARCHAR(255) NOT NULL UNIQUE,
  bio VARCHAR(1000),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT authors_email_nonempty CHECK (char_length(trim(email)) > 0)
);

CREATE TABLE IF NOT EXISTS posts (
  id BIGSERIAL PRIMARY KEY,
  author_id BIGINT NOT NULL REFERENCES authors(id) ON DELETE CASCADE,
  title VARCHAR(200) NOT NULL CHECK (char_length(trim(title)) > 0),
  content TEXT NOT NULL CHECK (char_length(trim(content)) > 0),
  published BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT posts_content_nonempty CHECK (char_length(trim(content)) > 0)
);
CREATE TABLE IF NOT EXISTS comments (
  id BIGSERIAL PRIMARY KEY,
  post_id BIGINT NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
  author_id BIGINT NOT NULL REFERENCES authors(id) ON DELETE CASCADE,
  content VARCHAR(5000) NOT NULL CHECK (char_length(trim(content)) > 0),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_posts_author_id ON posts(author_id);
CREATE INDEX IF NOT EXISTS idx_posts_created_at ON posts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_comments_post_id ON comments(post_id);
CREATE INDEX IF NOT EXISTS idx_comments_author_id ON comments(author_id);
COMMIT;
