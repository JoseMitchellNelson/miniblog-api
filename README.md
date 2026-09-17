# MiniBlog API

## 1. Título y descripción

MiniBlog API es una API REST desarrollada para gestionar autores, publicaciones y comentarios. Permite crear, consultar, actualizar y eliminar autores y posts, actualizar parcialmente un autor y crear y listar comentarios. Los datos se almacenan en PostgreSQL mediante consultas SQL parametrizadas.

## 2. URL de la API

[miniblog-api-production-9095.up.railway.app]


## 3. Tecnologías utilizadas

- **Node.js:** entorno de ejecución de JavaScript.
- **Express:** servidor HTTP y rutas REST.
- **PostgreSQL:** persistencia de datos.
- **pg:** conexión a PostgreSQL y consultas SQL directas.
- **dotenv:** carga de variables de entorno.
- **Helmet y CORS:** cabeceras de seguridad y configuración de acceso entre orígenes.
- **OpenAPI, YAML y Swagger UI:** documentación interactiva.
- **Supertest y node:test:** pruebas HTTP y de validación.
- **Git y GitHub:** control de versiones y repositorio.
- **Railway:** plataforma prevista para alojar la API y PostgreSQL.

## 4. Endpoints disponibles

| Método | Endpoint | Descripción |
|---|---|---|
| GET | `/health` | Comprobar que la API responde |
| GET | `/authors` | Listar autores |
| GET | `/authors/:id` | Consultar un autor |
| POST | `/authors` | Crear un autor |
| PUT | `/authors/:id` | Actualizar un autor con nombre y correo obligatorios |
| PATCH | `/authors/:id` | Actualizar únicamente los campos enviados |
| DELETE | `/authors/:id` | Eliminar un autor |
| GET | `/posts` | Listar posts con datos del autor |
| GET | `/posts/:id` | Consultar un post |
| GET | `/posts/author/:authorId` | Listar posts de un autor con su detalle |
| POST | `/posts` | Crear un post |
| PUT | `/posts/:id` | Actualizar un post |
| DELETE | `/posts/:id` | Eliminar un post |
| GET | `/comments` | Listar comentarios |
| POST | `/comments` | Crear un comentario |

Los códigos de respuesta son `200` para consultas y actualizaciones, `201` para creación, `204` para eliminación, `400` para datos inválidos o correo duplicado, `404` para recursos o rutas inexistentes y `500` para errores internos.

El correo de cada autor debe ser único. Las referencias a autores y posts deben existir. Las eliminaciones se propagan en cascada: al eliminar un post se eliminan sus comentarios; al eliminar un autor se eliminan sus posts y los comentarios relacionados, además de los escritos por ese autor.

## 5. Ejemplos de uso

En Thunder Client, selecciona el método, escribe la URL y utiliza **Body → JSON** para enviar datos. El encabezado debe ser `Content-Type: application/json`. Sustituye los IDs de ejemplo por IDs existentes.

### Crear un autor

`POST .../authors`

```json
{
  "name": "Ana Torres",
  "email": "ana@example.com",
  "bio": "Estudiante de desarrollo backend"
}
```

Respuesta esperada: `201 Created`, con el autor creado y su ID.

### Consultar autores

`GET .../authors`

Devuelve `200 OK` y una lista de autores, o `[]` si no hay registros.

### Actualizar únicamente el correo

`PATCH .../authors/1`

```json
{
  "email": "ana.nuevo@example.com"
}
```

Devuelve `200 OK` y conserva los campos omitidos. PATCH acepta `name`, `email` y `bio`; requiere al menos uno. Para eliminar la biografía, envía `{"bio": null}`.

### Actualizar un autor con PUT

`PUT .../authors/1`

```json
{
  "name": "Ana Torres",
  "email": "ana.nuevo@example.com",
  "bio": "Desarrolladora backend"
}
```

Nombre y correo son obligatorios. Si omites `bio`, queda en `null`.

### Crear un post

`POST .../posts`

```json
{
  "author_id": 1,
  "title": "Mi primera publicación",
  "content": "Estoy aprendiendo a construir una API con Express.",
  "published": true
}
```

Devuelve `201 Created`. Para actualizarlo, envía esos campos mediante `PUT /posts/:id`. Si se omite `published`, se utiliza `false`, también al actualizar.

### Consultar posts por autor

`GET .../posts/author/1`

Devuelve una lista de posts con un objeto `author` que contiene los datos de su autor. Si no hay resultados, devuelve `[]`.

### Crear un comentario

`POST .../comments`

```json
{
  "post_id": 1,
  "author_id": 1,
  "content": "Buen artículo."
}
```

Devuelve `201 Created`. El post y el autor deben existir.

### Eliminar un post

`DELETE .../posts/1`

No requiere cuerpo. Devuelve `204 No Content` si se elimina correctamente.

## 6. Documentación interactiva

Swagger UI está disponible en:



**Producción:** [miniblog-api-production-9095.up.railway.app/docs]

Desde Swagger puedes consultar las operaciones, revisar los cuerpos JSON y ejecutar solicitudes. La especificación se encuentra en `docs/openapi.yaml`.


## 7. Instalación local

Necesitas Node.js compatible con `package.json`, npm y una base PostgreSQL local o remota.

1. Descarga o clona el proyecto, abre una terminal en su carpeta e instala las dependencias:

```bash
npm ci
```

2. Copia `.env.example` como `.env`. En PowerShell:

```powershell
Copy-Item .env.example .env
```

3. Configura la conexión con tus datos:

```dotenv
PORT=3000
NODE_ENV=development
DATABASE_URL=postgresql://postgres:TU_PASSWORD@localhost:5432/miniblog
DB_SSL=false
```

El archivo `.env` debe estar junto a `package.json`. No lo subas a GitHub. Si utilizas PostgreSQL de Railway desde tu computador, asigna el valor de su conexión pública a `DATABASE_URL`. Configura `DB_SSL` según los requisitos de TLS de tu servidor.

4. Si usas PostgreSQL local y la base todavía no existe, créala desde pgAdmin o SQL Shell:

```sql
CREATE DATABASE miniblog;
```

5. Crea las tablas, carga los datos de ejemplo e inicia la API:

```bash
npm run db:schema
npm run db:seed
npm run dev
```

Estos comandos corresponden a la versión corregida con `scripts/run-sql.js`. En `package.json` deben estar definidos así:

```json
"db:schema": "node scripts/run-sql.js schema.sql",
"db:seed": "node scripts/run-sql.js seed.sql"
```

Si partes del ZIP inicial, incorpora primero el ejecutor SQL y el endpoint PATCH agregados durante el desarrollo. No necesitas instalar el paquete npm `psql`.

6. Comprueba `GET http://localhost:3000/health`; debe devolver:

```json
{
  "status": "ok"
}
```

Para verificar acceso a las tablas, consulta `/authors`. La raíz `/` no tiene un endpoint definido.

Ejecuta las pruebas automatizadas con:

```bash
npm test
```

La suite inicial contiene cinco pruebas de salud HTTP, validaciones y ruta inexistente. No comprueba el CRUD completo contra PostgreSQL ni el PATCH; esas operaciones deben verificarse adicionalmente con Thunder Client o Swagger.

Para iniciar sin modo de desarrollo:

```bash
npm start
```

Esta versión no incluye autenticación ni permisos: los endpoints son accesibles para quienes puedan conectarse a la API.
