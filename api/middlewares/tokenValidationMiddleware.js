require('dotenv').config();
const jwt = require('jsonwebtoken');

module.exports = async (ctx, next) => {
  try {
    const token = ctx.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.TOKEN_SALT);
    const userId = decodedToken.userId;
    if (ctx.request.body.userId && ctx.request.body.userId !== userId) {
      return ctx.throw(400, 'Invalid token');
    } else {
      await next();
    }
  } catch (error) {
    ctx.throw(401, 'Invalid request');
  }
}