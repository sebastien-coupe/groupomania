const router = require('@koa/router')({
  prefix: '/api/auth'
});

const authController = require('../controllers/authController');

// Manage request to /api/auth/signup endpoint
router.post('/signup', authController.signup);

// Manage request to /api/auth/signin endpoint
router.post('/signin', authController.signin);

module.exports = router;