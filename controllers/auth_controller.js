const UserModel = require("../models/user");

function registerNew(req, res) {
  res.render("authentication/register");
}

async function registerCreate(req, res) {
  const { email, password } = req.body;
  try{
          const user = await UserModel.create({ email, password });
          req.session.user = user;
  }
  catch(err){
      console.log(err)
  }
}
module.exports = {
  registerNew,
  registerCreate
}