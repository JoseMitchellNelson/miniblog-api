const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yaml');
const fs = require('node:fs');
const path = require('node:path');
const authorsRoutes = require('./routes/authors.routes');
const postsRoutes = require('./routes/posts.routes');
const commentsRoutes = require('./routes/comments.routes');
const { notFound, errorHandler } = require('./middleware/error-handler');

const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '1mb' }));

app.get('/health', (req, res) => res.json({ status: 'ok' }));
app.use('/authors', authorsRoutes);
app.use('/posts', postsRoutes);
app.use('/comments', commentsRoutes);

const spec = YAML.parse(fs.readFileSync(path.join(__dirname, '../docs/openapi.yaml'), 'utf8'));
app.use('/docs', swaggerUi.serve, swaggerUi.setup(spec));
app.use(notFound);
app.use(errorHandler);

module.exports = app;
