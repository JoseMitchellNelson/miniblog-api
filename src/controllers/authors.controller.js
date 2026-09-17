const authors = require("../repositories/authors.repository");
const { validateAuthor, parseId } = require("../utils/validation");

async function list(req, res, next) {
  try {
    res.json(await authors.findAll());
  } catch (e) {
    next(e);
  }
}

async function get(req, res, next) {
  try {
    const id = parseId(req.params.id);
    if (!id) return res.status(400).json({ error: "ID inválido" });

    const value = await authors.findById(id);
    return value
      ? res.json(value)
      : res.status(404).json({ error: "Autor no encontrado" });
  } catch (e) {
    next(e);
  }
}

async function create(req, res, next) {
  try {
    const errors = validateAuthor(req.body);
    if (errors.length)
      return res
        .status(400)
        .json({ error: "Datos inválidos", details: errors });
    return res.status(201).json(await authors.create(req.body));
  } catch (e) {
    next(e);
  }
}

async function update(req, res, next) {
  try {
    const id = parseId(req.params.id);
    if (!id) return res.status(400).json({ error: "ID inválido" });
    const errors = validateAuthor(req.body);
    if (errors.length)
      return res
        .status(400)
        .json({ error: "Datos inválidos", details: errors });
    const value = await authors.update(id, req.body);
    return value
      ? res.json(value)
      : res.status(404).json({ error: "Autor no encontrado" });
  } catch (e) {
    next(e);
  }
}

async function remove(req, res, next) {
  try {
    const id = parseId(req.params.id);
    if (!id) return res.status(400).json({ error: "ID inválido" });
    return (await authors.remove(id))
      ? res.status(204).send()
      : res.status(404).json({ error: "Autor no encontrado" });
  } catch (e) {
    next(e);
  }
}

async function patch(req, res, next) {
  try {
    const id = parseId(req.params.id);
    if (!id) return res.status(400).json({ error: "ID inválido" });

    const current = await authors.findById(id);

    if (!current) {
      return res.status(404).json({ error: "Autor no encontrado" });
    }

    const errors = validateAuthor({ ...current, ...req.body });

    if (errors.length)
      return res
        .status(400)
        .json({ error: "Datos inválidos", details: errors });
    const value = await authors.patch(id, req.body);
    return value
      ? res.json(value)
      : res.status(404).json({ error: "Autor no encontrado" });
  } catch (e) {
    next(e);
  }
}

module.exports = { list, get, create, update, remove, patch };
