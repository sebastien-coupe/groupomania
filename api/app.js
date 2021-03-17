const Koa = require('koa');
const bodyParser = require('koa-bodyparser');

const app = new Koa();

app.use(bodyParser());

const authRouter = require('./routes/authRoutes');

app
  .use(authRouter.routes())
  .use(authRouter.allowedMethods());

module.exports = app;