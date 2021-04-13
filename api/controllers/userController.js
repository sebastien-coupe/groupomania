const { Post, User, Comment } = require('../models');


exports.update = async ctx => {
  const update = ctx.request.body;
  const avatar = ctx.file ? `${ctx.protocol}://${ctx.host}/${ctx.file.path}` : '';
  const { uuid } = ctx.params;

  const user = await User.findOne({
    where: {
      uuid
    }
  });

  if (update.email) {
    user.email = update.email
  }

  if (update.role) {
    user.role = update.role
  }

  if (avatar) {
    user.avatarUrl = avatar
  }

  await user.save();

  ctx.body = {
    status: 'success',
    user
  }
}

exports.delete = async ctx => {
  const { uuid } = ctx.params;

  const user = await User.findOne({
    where: {
      uuid
    }
  });

  await Comment.destroy({
    where: {
      userId: user.id
    }
  });

  const userPosts = await Post.findAll({
    where: {
      userId: user.id
    }
  });


  if (userPosts) {
    for (let post of userPosts) {
      await Comment.destroy({
        where: {
          postId: post.id
        }
      })
    }
  }

  await Post.destroy({
    where: {
      userId: user.id
    }
  });

  await User.destroy({
    where: {
      id: user.id
    }
  })

  ctx.body = {
    message: "User has been deleted"
  }
}