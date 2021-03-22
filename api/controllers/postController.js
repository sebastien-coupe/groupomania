const { Post } = require('../models');

exports.findAll = async ctx => {
  const posts = await Post.findAll();

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
    }
  });

  if (!post) ctx.throw(404, 'No post matching uuid');

  ctx.body = {
    status: 'success',
    post
  }
}

exports.create = async ctx => {
  const { body, imageUrl, userId } = ctx.request.body;

  if (!body || !userId) ctx.throw(400, 'Request is not valid')

  const createdPost = await Post.create({
    body,
    imageUrl,
    userId
  });

  if (!createdPost) ctx.throw(500, 'Database error saving new post')

  ctx.status = 201;
  ctx.body = {
    status: 'success',
    message: 'New post has been created successfully'
  }
}

exports.update = async ctx => {
  const body = ctx.request.body;
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