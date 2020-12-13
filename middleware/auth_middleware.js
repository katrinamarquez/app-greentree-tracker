// redirect the user if already registered or logged in
const authRedirect = (req, res, next) => {
  if (req.session && res.session.user) {
    return res.redirect("/");
  }
  return next();
}

module.exports = authRedirect