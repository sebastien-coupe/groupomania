const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const errorHandler = require('./middlewares/errorHandlerMiddleware');

const app = new Koa();

app.use(bodyParser());
app.use(errorHandler);

const authRouter = require('./routes/authRoutes');

app
  .use(authRouter.routes())
  .use(authRouter.allowedMethods());

module.exports = app;