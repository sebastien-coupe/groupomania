const router = require('@koa/router')({
  prefix: '/api/posts'
});

router.get('/', async ctx => {
  ctx.body = {
    status: 'success',
    message: 'Fetch all posts'
  }
});

router.get('/:uuid', async ctx => {
  ctx.body = {
    status: 'success',
    message: `Fetch post identified by ${ctx.params.uuid} uuid`
  }
});

router.post('/', async ctx => {
  ctx.body = {
    status: 'success',
    message: 'Create a new post'
  }
});

router.put('/:uuid', async ctx => {
  ctx.body = {
    status: 'success',
    message: `Update post identified by ${ctx.params.uuid} uuid`
  }
});

router.del('/:uuid', async ctx => {
  ctx.body = {
    status: 'success',
    message: `Delete post identified by ${ctx.params.uuid} uuid`
  }
});

module.exports = router;