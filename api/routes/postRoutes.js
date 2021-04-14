const router = require('@koa/router')({
  prefix: '/api/posts'
});

const postController = require('../controllers/postController');

const imageUpload = require('../middlewares/imageUploadMiddleware');

const tokenValidation = require('../middlewares/tokenValidationMiddleware');

router.get('/', tokenValidation, postController.findAll);

router.get('/:uuid', tokenValidation, postController.findOne);

router.get('/:uuid/comments', tokenValidation, postController.getComments);

router.post('/', tokenValidation, imageUpload, postController.create);

router.post('/:uuid/comments', tokenValidation, postController.addComment);

router.put('/:uuid', tokenValidation, imageUpload, postController.update);

router.del('/:uuid', tokenValidation, postController.delete);

router.get('/:uuid/report', tokenValidation, postController.report);

router.get('/:uuid/restore', tokenValidation, postController.restore);

module.exports = router;