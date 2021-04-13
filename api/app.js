const Koa = require('koa');
const serve = require('koa-static');
const path = require('path');
const mount = require('koa-mount');
const bodyParser = require('koa-body');
const errorHandler = require('./middlewares/errorHandlerMiddleware');

const app = new Koa();

// Routers
const authRouter = require('./routes/authRoutes');
const postRouter = require('./routes/postRoutes');
const userRouter = require('./routes/userRoutes');

app.use(errorHandler);
app.use(bodyParser());

app.use(mount('/public', serve(path.join(__dirname, '/public'))));

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

app
  .use(userRouter.routes())
  .use(userRouter.allowedMethods());

module.exports = app;