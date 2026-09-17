const test = require("node:test");
const assert = require("node:assert/strict");
const request = require("supertest");
const app = require("../src/app");
const {
  validateAuthor,
  validatePost,
  validateComment,
} = require("../src/utils/validation");
test("GET /health responde 200", async () => {
  const r = await request(app).get("/health");
  assert.equal(r.status, 200);
  assert.deepEqual(r.body, { status: "ok" });
});
test("POST /authors rechaza nombre vacío", async () => {
  assert.equal(
    (
      await request(app)
        .post("/authors")
        .send({ name: "", email: "ana@example.com" })
    ).status,
    400,
  );
});
test("POST /posts rechaza campos ausentes", async () => {
  const r = await request(app).post("/posts").send({ title: "Prueba" });
  assert.equal(r.status, 400);
  assert.ok(r.body.details.length >= 2);
});
test("ruta inexistente responde 404", async () => {
  assert.equal((await request(app).get("/no-existe")).status, 404);
});
test("validaciones aceptan datos correctos", () => {
  assert.deepEqual(
    validateAuthor({ name: "Ana", email: "ana@example.com" }),
    [],
  );
  assert.deepEqual(
    validatePost({
      title: "Post",
      content: "Texto",
      author_id: 1,
      published: true,
    }),
    [],
  );
  assert.deepEqual(
    validateComment({ post_id: 1, author_id: 1, content: "Bien" }),
    [],
  );
});
