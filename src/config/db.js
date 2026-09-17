const path = require('node:path');
require('dotenv').config({
  path: path.resolve(__dirname, '../../.env')
});

const { Pool } = require('pg');

if (!process.env.DATABASE_URL) {
  throw new Error('Falta DATABASE_URL en el archivo .env');
}

const url = new URL(process.env.DATABASE_URL);

if (!url.password) {
  throw new Error('DATABASE_URL no contiene una contraseña');
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DB_SSL === 'true'
    ? { rejectUnauthorized: true }
    : false
});

module.exports = pool;