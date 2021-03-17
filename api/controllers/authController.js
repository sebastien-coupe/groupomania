exports.signup = async ctx => {
  console.log(ctx.request.body);
  ctx.body = {
    message: "Successfully registred"
  }
}

exports.signin = async ctx => {
  console.log(ctx.request.body);
  ctx.body = {
    message: "Successfully authenticated"
  }
}