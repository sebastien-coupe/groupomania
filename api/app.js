const Koa = require('koa');

const app = new Koa();

app.use(async ctx => {
  ctx.body = {
    message: "Hello, world"
  }
});

app.listen(3000, () => {
  console.log('App is running on http://localhost:3000');
})