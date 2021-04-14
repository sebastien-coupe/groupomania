const koaBody = require('koa-body')({
  multipart: true
});

const router = require('@koa/router')({
  prefix: '/api/users'
});

const userController = require('../controllers/userController');

const tokenValidation = require('../middlewares/tokenValidationMiddleware');

const avatarUpload = require('../middlewares/avatarUploadMiddleware');

router.put('/:uuid', tokenValidation, avatarUpload, userController.update);

router.delete('/:uuid', tokenValidation, userController.delete);

module.exports = router;
