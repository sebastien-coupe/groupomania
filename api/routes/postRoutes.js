const router = require('@koa/router')({
  prefix: '/api/posts'
});

const postController = require('../controllers/postController');

const imageUpload = require('../middlewares/imageUploadMiddleware');

router.get('/', postController.findAll);

router.get('/:uuid', postController.findOne);

router.post('/', imageUpload, postController.create);

router.put('/:uuid', imageUpload, postController.update);

router.del('/:uuid', postController.delete);

module.exports = router;