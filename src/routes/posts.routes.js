const router = require('express').Router();
const controller = require('../controllers/posts.controller');
router.get('/', controller.list);
router.get('/author/:authorId', controller.byAuthor);
router.get('/:id', controller.get);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.delete('/:id', controller.remove);
module.exports = router;
