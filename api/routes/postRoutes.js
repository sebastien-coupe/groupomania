const router = require('@koa/router')({
  prefix: '/api/posts'
});

const postController = require('../controllers/postController');

router.get('/', postController.findAll);

router.get('/:uuid', postController.findOne);

router.post('/', postController.create);

router.put('/:uuid', postController.update);

router.del('/:uuid', postController.delete);

module.exports = router;