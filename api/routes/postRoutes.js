const router = require('@koa/router')({
  prefix: '/api/posts'
});

const postController = require('../controllers/postController');

const imageUpload = require('../middlewares/imageUploadMiddleware');

const tokenValidation = require('../middlewares/tokenValidationMiddleware');

router.get('/', tokenValidation, postController.findAll);

router.get('/:uuid', tokenValidation, postController.findOne);

router.post('/', tokenValidation, imageUpload, postController.create);

router.put('/:uuid', tokenValidation, imageUpload, postController.update);

router.del('/:uuid', tokenValidation, postController.delete);

router.get('/:uuid/report', tokenValidation, postController.report);

module.exports = router;