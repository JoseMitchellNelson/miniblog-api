const fs = require('node:fs/promises');
const path = require('node:path');
const pool = require('../src/config/db');
require('dotenv').config();

async function main() {
  try {
    if (!process.env.DATABASE_URL) {
      throw new Error('Falta DATABASE_URL en el archivo .env');
    }

    const file = process.argv[2];

    if (!['schema.sql', 'seed.sql'].includes(file)) {
      throw new Error('Debes indicar schema.sql o seed.sql');
    }

    const sqlPath = path.join(__dirname, '..', 'sql', file);
    const sql = await fs.readFile(sqlPath, 'utf8');

    await pool.query(sql);
    console.log(`${file} ejecutado correctamente`);
  } catch (error) {
    console.error('Error al ejecutar SQL:', error.message);
    process.exitCode = 1;
  } finally {
    await pool.end();
  }
}

main();