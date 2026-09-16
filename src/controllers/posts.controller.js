const posts = require('../repositories/posts.repository');
const { validatePost, parseId } = require('../utils/validation');

async function list(req, res, next) {
  try {
    res.json(await posts.findAll());
  } catch (error) { next(error); }
}

async function get(req, res, next) {
  try {
    const id = parseId(req.params.id);
    if (!id) return res.status(400).json({ error: 'ID inválido' });
    const post = await posts.findById(id);
    return post ? res.json(post) : res.status(404).json({ error: 'Publicación no encontrada' });
  } catch (error) { next(error); }
}

async function create(req, res, next) {
  try {
    const errors = validatePost(req.body);
    if (errors.length) return res.status(400).json({ error: 'Datos inválidos', details: errors });
    res.status(201).json(await posts.create(req.body));
  } catch (error) { next(error); }
}

async function update(req, res, next) {
  try {
    const id = parseId(req.params.id);
    if (!id) return res.status(400).json({ error: 'ID inválido' });
    const errors = validatePost(req.body);
    if (errors.length) return res.status(400).json({ error: 'Datos inválidos', details: errors });
    const post = await posts.update(id, req.body);
    return post ? res.json(post) : res.status(404).json({ error: 'Publicación no encontrada' });
  } catch (error) { next(error); }
}

async function remove(req, res, next) {
  try {
    const id = parseId(req.params.id);
    if (!id) return res.status(400).json({ error: 'ID inválido' });
    return (await posts.remove(id)) ? res.status(204).send() : res.status(404).json({ error: 'Publicación no encontrada' });
  } catch (error) { next(error); }
}

async function byAuthor(req,res,next) {
  try { const id=parseId(req.params.authorId); if(!id)return res.status(400).json({error:'authorId inválido'}); return res.json(await posts.findByAuthor(id)); }
  catch(error){ next(error); }
}
module.exports = { list, get, byAuthor, create, update, remove };
