const router=require('express').Router();
const c=require('../controllers/comments.controller');
router.get('/',c.list);
router.post('/',c.create);
module.exports=router;
