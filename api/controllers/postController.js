const { Post, User } = require('../models');
const fs = require('fs/promises');

exports.findAll = async ctx => {
  const posts = await Post.findAll({
    include: 'author',
    order: [['createdAt', 'desc']]
  });

  ctx.body = {
    status: 'success',
    posts
  }
}

exports.findOne = async ctx => {
  const { uuid } = ctx.params;

  const post = await Post.findOne({
    where: {
      uuid
    },
    include: 'author'
  });

  if (!post) ctx.throw(404, 'No post matching uuid');

  ctx.body = {
    status: 'success',
    post
  }
}

exports.create = async ctx => {
  const { body, uid } = ctx.request.body;

  const imageUrl = ctx.file ? `${ctx.protocol}://${ctx.host}/${ctx.file.path}` : '';

  if (!body || !uid) ctx.throw(400, 'Request is not valid')

  const user = await User.findOne({
    where: {
      uuid: uid
    }
  });

  console.log(user);

  const createdPost = await Post.create({
    body,
    userId: user.id,
    imageUrl
  });

  if (!createdPost) ctx.throw(500, 'Database error saving new post')

  ctx.status = 201;
  ctx.body = {
    status: 'success',
    post: createdPost
  }
}

exports.update = async ctx => {
  const imageUrl = ctx.file ? `${ctx.protocol}://${ctx.host}/${ctx.file.path}` : '';

  if (!ctx.file && !ctx.request.body) ctx.throw(400, 'Cannot update without content')

  const body = imageUrl ? {
    ...ctx.request.body,
    imageUrl
  } : {
    ...ctx.request.body
  };

  const { uuid } = ctx.params;

  if (!Object.keys(body).length) ctx.throw(400, 'Request is not valid');

  const [updatedPost] = await Post.update(
    body,
    {
      where: {
        uuid
      }
    }
  );

  if (!updatedPost) ctx.throw(400, 'No post matching uuid')

  ctx.body = {
    status: 'success',
    message: `Update post identified by ${ctx.params.uuid} uuid`
  }
}

exports.delete = async ctx => {
  const { uuid } = ctx.params;

  const postToDelete = await Post.findOne({
    where: {
      uuid
    }
  });

  const associatedImageFile = postToDelete.imageUrl ? postToDelete.imageUrl.split('/uploads/')[1] : null;

  if (associatedImageFile) {
    await fs.unlink(`public/uploads/${associatedImageFile}`);
  }

  const deletedPost = await Post.destroy({
    where: {
      uuid
    }
  });

  if (!deletedPost) ctx.throw(400, 'No post matching uuid');

  ctx.body = {
    status: 'success',
    message: `Delete post identified by ${uuid} uuid`
  }
}