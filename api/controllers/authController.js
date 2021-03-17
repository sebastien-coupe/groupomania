const { User } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

require('dotenv').config();

exports.signup = async ctx => {
  const { email, password } = ctx.request.body;

  if (!email || !password) ctx.throw(400, 'Invalid Credentials');

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      email,
      password: hashedPassword
    });

    if (user) {
      ctx.status = 201
      ctx.body = {
        status: 'success',
        message: 'Registration Success'
      }
    }
  } catch (error) {
    // Status code to be changed ?
    ctx.throw(409, 'Email already registered');
  }
}

exports.signin = async ctx => {
  const { email, password } = ctx.request.body;

  if (!email || !password) ctx.throw(400, 'Invalid Credentials');

  try {
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

  } catch (error) {
    ctx.throw(500, error.message);
  }
}