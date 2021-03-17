exports.signup = async ctx => {
  ctx.body = {
    message: "Successfully registred"
  }
}

exports.signin = async ctx => {
  ctx.body = {
    message: "Successfully authenticated"
  }
}