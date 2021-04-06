require('dotenv').config();
const jwt = require('jsonwebtoken');

module.exports = async (ctx, next) => {
  try {
    const token = ctx.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.TOKEN_SALT);
    const uid = decodedToken.uid;
    if (ctx.request.body.uid && ctx.request.body.uid !== uid) {
      return ctx.throw(400, 'Invalid token');
    } else {
      await next();
    }
  } catch (error) {
    ctx.throw(401, 'Invalid request');
  }
}