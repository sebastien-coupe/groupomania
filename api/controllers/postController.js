const { Post, User, Comment, Vote } = require('../models');
const fs = require('fs/promises');

exports.findAll = async ctx => {
  const { filter } = ctx.query;

  const query = {
    include: ['author', 'votes'],
    order: [['createdAt', 'DESC']]
  }

  if (filter) {
    query.where = { [filter]: true }
  }

  const posts = await Post.findAll(query);

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

  const createdPost = await Post.create({
    body,
    userId: user.id,
    imageUrl
  });

  const vote = await Vote.create({
    postId: createdPost.id,
    usersLiked: [],
    usersDisliked: []
  })

  if (!createdPost) ctx.throw(500, 'Database error saving new post')

  ctx.status = 201;
  ctx.body = {
    status: 'success',
    post: createdPost
  }
}

exports.update = async ctx => {
  const update = ctx.request.body
  const imageUrl = ctx.file ? `${ctx.protocol}://${ctx.host}/${ctx.file.path}` : '';

  if (!ctx.file && !ctx.request.body) ctx.throw(400, 'Cannot update without content')

  const { uuid } = ctx.params;

  const post = await Post.findOne({
    where: {
      uuid
    }
  });

  if (update.delImg) {
    const associatedImageFile = post.imageUrl ? post.imageUrl.split('/uploads/')[1] : null;

    if (associatedImageFile) {
      await fs.unlink(`public/uploads/${associatedImageFile}`);
      post.imageUrl = '';
    }

  }

  if (update.body && update.body !== "") {
    post.body = update.body
  }

  if (imageUrl !== '') {
    post.imageUrl = imageUrl
  }

  const updatedPost = await post.save();

  ctx.body = {
    status: 'success',
    post: updatedPost
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

  const _deletedComments = await Comment.destroy({
    where: {
      postId: postToDelete.id
    }
  });

  const deletedPost = await Post.destroy({
    where: {
      uuid
    },
  });

  if (!deletedPost) ctx.throw(400, 'No post matching uuid');

  ctx.body = {
    status: 'success',
    uuid
  }
}

exports.report = async ctx => {
  const { uuid } = ctx.params;

  const [result] = await Post.update(
    { hasBeenReported: true },
    {
      where: {
        uuid
      }
    }
  );

  if (!result) ctx.throw(400, 'No post matching uuid')

  ctx.body = {
    status: 'success',
    uuid
  }
}

exports.restore = async ctx => {
  const { uuid } = ctx.params;

  const [result] = await Post.update(
    { hasBeenReported: false },
    {
      where: {
        uuid
      }
    }
  );

  if (!result) ctx.throw(400, 'No post matching uuid')

  ctx.body = {
    status: 'success',
    uuid
  }
}

exports.getComments = async ctx => {
  const { uuid } = ctx.params;

  const post = await Post.findOne({
    where: {
      uuid
    }
  })

  const comments = await Comment.findAll({
    include: 'author',
    where: {
      postId: post.id
    },
    order: [['createdAt', 'desc']]
  });

  ctx.body = {
    status: 'success',
    comments
  }
}

exports.addComment = async ctx => {
  const { body, uid } = ctx.request.body;
  const { uuid } = ctx.params;

  if (!body || !uid || !uuid) ctx.throw(400, 'Request is not valid');

  const user = await User.findOne({
    where: {
      uuid: uid
    }
  });

  const post = await Post.findOne({
    where: {
      uuid
    }
  });

  const createdComment = await Comment.create({
    body,
    userId: user.id,
    postId: post.id
  });

  if (!createdComment) ctx.throw(500, 'Database error saving new post')

  ctx.status = 201;
  ctx.body = {
    status: 'success',
    comment: createdComment
  }
}

exports.like = async ctx => {
  const { userId } = ctx.request.body;
  const { uuid } = ctx.params;

  const post = await Post.findOne({
    where: {
      uuid
    }
  })

  const vote = await Vote.findOne({
    where: {
      postId: post.id
    }
  });

  if (!vote.usersLiked.includes(userId)) {
    if (vote.usersDisliked.includes(userId)) {
      vote.usersDisliked = vote.usersDisliked.filter(user => user !== userId);
    }
    vote.usersLiked = [...vote.usersLiked, userId]
  }


  const saved = await vote.save();

  ctx.body = {
    votes: saved
  }
}

exports.dislike = async ctx => {
  const { userId } = ctx.request.body;
  const { uuid } = ctx.params;

  const post = await Post.findOne({
    where: {
      uuid
    }
  })

  const vote = await Vote.findOne({
    where: {
      postId: post.id
    }
  });

  if (!vote.usersDisliked.includes(userId)) {
    if (vote.usersLiked.includes(userId)) {
      vote.usersLiked = vote.usersLiked.filter(user => user !== userId);
    }
    vote.usersDisliked = [...vote.usersDisliked, userId]
  }

  const saved = await vote.save();

  ctx.body = {
    votes: saved
  }

}