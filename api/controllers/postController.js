exports.findAll = async ctx => {
  ctx.body = {
    status: 'success',
    message: 'Fetch all posts'
  }
}

exports.findOne = async ctx => {
  ctx.body = {
    status: 'success',
    message: `Fetch post identified by ${ctx.params.uuid} uuid`
  }
}

exports.create = async ctx => {
  ctx.body = {
    status: 'success',
    message: 'Create a new post'
  }
}

exports.update = async ctx => {
  ctx.body = {
    status: 'success',
    message: `Update post identified by ${ctx.params.uuid} uuid`
  }
}

exports.delete = async ctx => {
  ctx.body = {
    status: 'success',
    message: `Delete post identified by ${ctx.params.uuid} uuid`
  }
}