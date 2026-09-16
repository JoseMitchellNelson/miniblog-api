const db = require('../config/db');
async function findAll() { return (await db.query('SELECT id, name, email, bio, created_at FROM authors ORDER BY id')).rows; }
async function findById(id) { return (await db.query('SELECT id, name, email, bio, created_at FROM authors WHERE id = $1', [id])).rows[0] || null; }
async function create({ name, email, bio }) {
  return (await db.query('INSERT INTO authors (name, email, bio) VALUES ($1,$2,$3) RETURNING id,name,email,bio,created_at', [name.trim(), email.trim().toLowerCase(), bio?.trim() || null])).rows[0];
}
async function update(id, { name, email, bio }) {
  return (await db.query('UPDATE authors SET name=$1,email=$2,bio=$3 WHERE id=$4 RETURNING id,name,email,bio,created_at', [name.trim(), email.trim().toLowerCase(), bio?.trim() || null, id])).rows[0] || null;
}
async function remove(id) { return (await db.query('DELETE FROM authors WHERE id=$1', [id])).rowCount > 0; }
module.exports = { findAll, findById, create, update, remove };
