const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateAuthor(body) {
  const errors = [];
  {
    if (typeof body.name !== 'string' || body.name.trim().length < 2 || body.name.trim().length > 100) {
      errors.push('name debe tener entre 2 y 100 caracteres');
    }
  }
  {
    if (typeof body.email !== 'string' || body.email.length > 255 || !EMAIL_PATTERN.test(body.email)) {
      errors.push('email debe ser una dirección válida');
    }
  }
  if (body.bio != null && (typeof body.bio !== 'string' || body.bio.length > 1000)) errors.push('bio no puede superar 1000 caracteres');
  return errors;
}

function validatePost(body) {
  const errors = [];
  {
    if (typeof body.title !== 'string' || body.title.trim().length < 3 || body.title.trim().length > 200) {
      errors.push('title debe tener entre 3 y 200 caracteres');
    }
  }
  {
    if (typeof body.content !== 'string' || body.content.trim().length < 1 || body.content.length > 50000) {
      errors.push('content es obligatorio y no puede superar 50000 caracteres');
    }
  }
  if (!Number.isInteger(body.author_id) || body.author_id < 1) errors.push('author_id debe ser un entero positivo');
  
  if (body.published !== undefined && typeof body.published !== 'boolean') errors.push('published debe ser booleano');
  return errors;
}

function validateComment(body) {
  const errors=[];
  if(!Number.isInteger(body.post_id)||body.post_id<1) errors.push('post_id debe ser un entero positivo');
  if(!Number.isInteger(body.author_id)||body.author_id<1) errors.push('author_id debe ser un entero positivo');
  if(typeof body.content!=='string'||!body.content.trim()||body.content.length>5000) errors.push('content es obligatorio y no puede superar 5000 caracteres');
  return errors;
}

function parseId(value) {
  const id = Number(value);
  return Number.isInteger(id) && id > 0 ? id : null;
}

function parsePagination(query) {
  const page = Math.max(1, Number.parseInt(query.page, 10) || 1);
  const limit = Math.min(100, Math.max(1, Number.parseInt(query.limit, 10) || 20));
  return { page, limit, offset: (page - 1) * limit };
}

module.exports = { validateAuthor, validatePost, validateComment, parseId, parsePagination };
