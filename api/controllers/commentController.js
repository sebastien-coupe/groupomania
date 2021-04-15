const { Comment } = require('../models');

exports.delete = async ctx => {
  const { uuid } = ctx.params;

  const deletedComment = await Comment.destroy({
    where: {
      uuid
    },
  });

  if (!deletedComment) ctx.throw(400, 'No post matching uuid');

  ctx.body = {
    status: 'success',
    uuid
  }

}