const db = require("../config/db");
async function findAll() {
  return (
    await db.query(
      "SELECT id, name, email, bio, created_at FROM authors ORDER BY id",
    )
  ).rows;
}
async function findById(id) {
  return (
    (
      await db.query(
        "SELECT id, name, email, bio, created_at FROM authors WHERE id = $1",
        [id],
      )
    ).rows[0] || null
  );
}
async function create({ name, email, bio }) {
  return (
    await db.query(
      "INSERT INTO authors (name, email, bio) VALUES ($1,$2,$3) RETURNING id,name,email,bio,created_at",
      [name.trim(), email.trim().toLowerCase(), bio?.trim() || null],
    )
  ).rows[0];
}
async function update(id, { name, email, bio }) {
  return (
    (
      await db.query(
        "UPDATE authors SET name=$1,email=$2,bio=$3 WHERE id=$4 RETURNING id,name,email,bio,created_at",
        [name.trim(), email.trim().toLowerCase(), bio?.trim() || null, id],
      )
    ).rows[0] || null
  );
}
async function remove(id) {
  return (await db.query("DELETE FROM authors WHERE id=$1", [id])).rowCount > 0;
}

async function patch(id, fields) {
  // Los nombres de columnas provienen de una lista fija.
  const allowed = ['name', 'email', 'bio'];
  const keys = allowed.filter(key =>
    Object.prototype.hasOwnProperty.call(fields, key)
  );

  const values = keys.map(key => {
    const value = fields[key];

    if (key === 'email') return value.trim().toLowerCase();
    if (key === 'bio') return value?.trim() || null;
    return value.trim();
  });

  const assignments = keys.map(
    (key, index) => `${key} = $${index + 1}`
  );

  values.push(id);

  const { rows } = await db.query(
    `UPDATE authors
     SET ${assignments.join(', ')}
     WHERE id = $${values.length}
     RETURNING id, name, email, bio, created_at`,
    values
  );

  return rows[0] || null;
}
module.exports = { findAll, findById, create, update, remove, patch };
