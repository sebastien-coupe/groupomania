const koaBody = require('koa-body')({ multipart: true });

const router = require('@koa/router')({
  prefix: '/api/users'
});

const userController = require('../controllers/userController');

const tokenValidation = require('../middlewares/tokenValidationMiddleware');

router.put('/:uuid', koaBody, tokenValidation, userController.update);

router.delete('/:uuid', tokenValidation, userController.delete);

module.exports = router;
