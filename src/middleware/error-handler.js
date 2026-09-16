function notFound(req, res) {
  res.status(404).json({ error: 'Ruta no encontrada' });
}

function errorHandler(error, req, res, next) {
  if (error.code === '23505') return res.status(400).json({ error: 'El correo ya está registrado' });
  if (error.code === '23503') return res.status(400).json({ error: 'La referencia indicada no existe' });
  console.error(error);
  return res.status(500).json({ error: 'Error interno del servidor' });
}

module.exports = { notFound, errorHandler };
