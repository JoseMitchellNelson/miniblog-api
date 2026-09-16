require('dotenv').config();
const app = require('./app');
const db = require('./config/db');

const port = process.env.PORT || 3000;

async function start() {
  if (!process.env.DATABASE_URL) throw new Error('Falta la variable DATABASE_URL');
  await db.query('SELECT 1');
  app.listen(port, () => console.log(`MiniBlog API disponible en el puerto ${port}`));
}

start().catch((error) => {
  console.error('No fue posible iniciar la aplicación:', error.message);
  process.exit(1);
});
