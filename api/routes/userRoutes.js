const router = require('@koa/router')({
  prefix: '/api/users'
});

const userController = require('../controllers/userController');

const tokenValidation = require('../middlewares/tokenValidationMiddleware');

router.delete('/:uuid', tokenValidation, userController.delete);

router.put('/:uuid', tokenValidation, userController.update);


module.exports = router;