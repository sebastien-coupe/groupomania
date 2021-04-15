const router = require('@koa/router')({
  prefix: '/api/comments'
});

const commentController = require('../controllers/commentController');

const tokenValidation = require('../middlewares/tokenValidationMiddleware');

router.delete('/:uuid', tokenValidation, commentController.delete);

module.exports = router;