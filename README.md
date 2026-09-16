# MiniBlog API

Proyecto académico de una API REST con Node.js, Express y PostgreSQL. Incluye CRUD de autores y posts, comentarios como funcionalidad extra, SQL parametrizado, validaciones, pruebas con Supertest y documentación OpenAPI.

## Instalación local

Requiere Node.js 20+, PostgreSQL y el cliente `psql`.

```bash
git clone <URL_DEL_REPOSITORIO>
cd miniblog-api
npm install
cp .env.example .env
```

Crea la base `miniblog`, ajusta `DATABASE_URL` y ejecuta:

```bash
npm run db:schema
npm run db:seed
npm run dev
```

La API se abre en `http://localhost:3000`; Swagger UI en `/docs` y el health check en `/health`.

## Rutas

| Método | Ruta | Función |
|---|---|---|
| GET / POST | `/authors` | Listar o crear autores |
| GET / PUT / DELETE | `/authors/:id` | Consultar, actualizar o eliminar un autor |
| GET / POST | `/posts` | Listar o crear posts |
| GET / PUT / DELETE | `/posts/:id` | Consultar, actualizar o eliminar un post |
| GET | `/posts/author/:authorId` | Posts de un autor, incluyendo sus datos |
| GET / POST | `/comments` | Listar o crear comentarios |

Ejemplos:

```json
{ "name": "Ana Torres", "email": "ana@example.com", "bio": "Autora de tecnología" }
```

```json
{ "author_id": 1, "title": "Mi post", "content": "Contenido", "published": true }
```

```json
{ "post_id": 1, "author_id": 2, "content": "Buen artículo" }
```

## Pruebas

```bash
npm test
```

Supertest comprueba respuestas HTTP críticas sin necesitar una base activa; también se prueban las validaciones centrales. Para verificar el CRUD completo, inicia PostgreSQL, carga schema y seed, y prueba las rutas desde Swagger UI.

## Railway

1. Crea un repositorio Git y sube el proyecto. `.env` está ignorado; solo se versiona `.env.example`.
2. Crea un proyecto en Railway y añade PostgreSQL.
3. Vincula el repositorio de GitHub al servicio de aplicación.
4. Configura `DATABASE_URL`, `NODE_ENV=production` y `DB_SSL=true`. Railway proporciona `PORT` automáticamente.
5. Ejecuta `npm run db:schema` y opcionalmente `npm run db:seed` desde una terminal conectada a la base.
6. El comando de inicio es `npm start`. Verifica `/health` y `/docs` en el dominio público.

## Versionado recomendado

```bash
git init
git add .
git commit -m "chore: initialize Express project"
git commit -am "feat: add authors and posts CRUD"
git commit -am "test: add API validation tests"
git commit -am "feat: add comments endpoints and OpenAPI docs"
```

En un trabajo real cada commit debe hacerse inmediatamente después de su cambio. No se incluyen credenciales ni el directorio `node_modules`.
