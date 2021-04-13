const router = require('@koa/router')({
  prefix: '/api/users'
});

const userController = require('../controllers/userController');

const tokenValidation = require('../middlewares/tokenValidationMiddleware');

router.delete('/:uuid', userController.delete)


module.exports = router;