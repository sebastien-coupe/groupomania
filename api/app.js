const Koa = require('koa');

const app = new Koa();

app.use(async ctx => {
  ctx.body = {
    message: "Hello, world"
  }
});

module.exports = app;