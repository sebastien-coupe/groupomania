require('dotenv').config();
const { User } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const validator = require('validator');

exports.signup = async ctx => {
  const { lastname, firstname, email, password } = ctx.request.body;

  if (!lastname) ctx.throw(422, 'Lastname cannot be empty')
  if (!firstname) ctx.throw(422, 'Firstname cannot be empty')
  if (!email || !validator.isEmail(email)) ctx.throw(422, 'Email is not valid');
  if (!password || !validator.isLength(password, { min: 8 })) ctx.throw(422, 'Password is too weak');

  const defaultAvatarUrl = `${ctx.protocol}://${ctx.host}/public/avatars/default/${firstname[0].toLowerCase()}.png`;

  const hashedPassword = await bcrypt.hash(password, 10);

  const [user, created] = await User.findOrCreate({
    where: {
      email
    },
    defaults: {
      lastName: lastname,
      firstName: firstname,
      email,
      password: hashedPassword,
      avatarUrl: defaultAvatarUrl,
      role: 'Collaborateur Groupomania'
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
    user,
    token: jwt.sign(
      { uid: user.uuid },
      process.env.TOKEN_SALT,
      { expiresIn: '24h' }
    )
  }
}