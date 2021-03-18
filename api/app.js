const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const errorHandler = require('./middlewares/errorHandlerMiddleware');

const app = new Koa();

// Routers
const authRouter = require('./routes/authRoutes');
const postRouter = require('./routes/postRoutes');

app.use(bodyParser());
app.use(errorHandler);

// Prevent cors errors
app.use(async (ctx, next) => {
  ctx.set('Access-Control-Allow-Origin', '*');
  ctx.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  ctx.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  await next();
});

app
  .use(authRouter.routes())
  .use(authRouter.allowedMethods());

app
  .use(postRouter.routes())
  .use(postRouter.allowedMethods());

module.exports = app;