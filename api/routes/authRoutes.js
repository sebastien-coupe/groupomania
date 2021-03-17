const router = require('@koa/router')({
  prefix: '/api/auth'
});

// Manage request to /api/auth/signup endpoint
router.post('/signup', async ctx => {
  ctx.body = {
    message: "Successfully registred"
  }
});

// Manage request to /api/auth/signin endpoint
router.post('/signin', async ctx => {
  ctx.body = {
    message: "Successfully authenticated"
  }
});

module.exports = router;