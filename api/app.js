const Koa = require('koa');

const app = new Koa();

const authRouter = require('./routes/authRoutes');

app
  .use(authRouter.routes())
  .use(authRouter.allowedMethods());

module.exports = app;