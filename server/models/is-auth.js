module.exports = (req, res, next) => {
    if (req.session.isAuth == true) {
      next();
    } else {
      console.log("You have to Login first");
      //console.log('nao logado!')
      res.redirect("/");
    }
  };