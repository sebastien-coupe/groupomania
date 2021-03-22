require('dotenv').config();
const { User } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const validator = require('validator');

const passwordOptions = {
  minLength: 8,
  minLowercase: 1,
  minUppercase: 1,
  minNumbers: 1,
  minSymbols: 0
}

exports.signup = async ctx => {
  const { email, password } = ctx.request.body;

  if (!email || !validator.isEmail(email)) ctx.throw(422, 'Email is not valid');
  if (!password || !validator.isStrongPassword(password, passwordOptions)) ctx.throw(422, 'Password is too weak');

  const hashedPassword = await bcrypt.hash(password, 10);

  const [user, created] = await User.findOrCreate({
    where: {
      email
    },
    defaults: {
      email,
      password: hashedPassword
    }
  });

  if (!created) ctx.throw(409, 'Email address already used')

  ctx.status = 201
  ctx.body = {
    status: 'success',
    message: 'Registration Success'
  }
}

exports.signin = async ctx => {
  const { email, password } = ctx.request.body;

  if (!email || !password) ctx.throw(400, 'Invalid Credentials');

  const user = await User.findOne({
    where: {
      email
    }
  });

  if (!user) {
    return ctx.throw(401, 'Invalid Credentials');
  }

  const isValidPassword = await bcrypt.compare(password, user.password);

  if (!isValidPassword) {
    return ctx.throw(401, 'Invalid Credentials')
  }

  ctx.body = {
    userId: user.uuid,
    token: jwt.sign(
      { userId: user.uuid },
      process.env.TOKEN_SALT,
      { expiresIn: '24h' }
    )
  }
}