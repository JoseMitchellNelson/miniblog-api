const db = require('../config/db');

const SELECT_POST = `SELECT p.id,p.author_id,p.title,p.content,p.published,p.created_at,
json_build_object('id',a.id,'name',a.name,'email',a.email,'bio',a.bio) AS author
FROM posts p JOIN authors a ON a.id=p.author_id`;
async function findAll() { return (await db.query(`${SELECT_POST} ORDER BY p.created_at DESC`)).rows; }

async function findById(id) {
  const { rows } = await db.query(
    `${SELECT_POST} WHERE p.id=$1`, [id]
  );
  return rows[0] || null;
}

async function findByAuthor(authorId) { return (await db.query(`${SELECT_POST} WHERE p.author_id=$1 ORDER BY p.created_at DESC`,[authorId])).rows; }
async function create({ title, content, author_id, published = false }) {
  const { rows } = await db.query(
    `INSERT INTO posts (title,content,author_id,published) VALUES ($1,$2,$3,$4)
     RETURNING id,title,content,author_id,published,created_at`,
    [title.trim(),content.trim(),author_id,published]
  );
  return rows[0];
}

async function update(id, { title, content, author_id, published = false }) {
  const { rows } = await db.query(
    `UPDATE posts SET title=$1,content=$2,author_id=$3,published=$4 WHERE id=$5
     RETURNING id,title,content,author_id,published,created_at`,
    [title.trim(),content.trim(),author_id,published,id]
  );
  return rows[0];
}

async function remove(id) {
  const { rowCount } = await db.query('DELETE FROM posts WHERE id = $1', [id]);
  return rowCount > 0;
}

module.exports = { findAll, findById, findByAuthor, create, update, remove };
