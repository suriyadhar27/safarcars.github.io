const User = require("../models/user");
const bcrypt = require("bcrypt");

exports.getLogin = (req, res, next) => {
  res.render("signup", {
    pageTitle: "Login",
    path: "/login",
    isAuthenticated: req.session.isLoggedIn,
  });
};

exports.postLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  //   console.log(req.body);

  User.findOne({ email: email })
    .then((user) => {
      if (!user) {
        return res.redirect("/login");
      }
      bcrypt
        .compare(password, user.password)
        .then((doMatch) => {
          if (doMatch) {
            req.session.isLoggedIn = true;
            req.session.user = user;
            return req.session.save((err) => {
              //   console.log(err);
              res.redirect("/");
            });
          }
          res.redirect("/login");
        })
        .catch((err) => {
          console.log(err);
          res.redirect("/login");
        });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postSingup = async (req, res, next) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;

  const hashedPass = await bcrypt.hash(password, 12);

  const u = await User.findOne({ email: email });
  if (u) {
    return res.redirect("/login");
  }

  const user = new User({
    name: name,
    email: email,
    password: hashedPass,
  });

  user.save().then((result) => {
    res.redirect("/login");
  });
};

exports.postLogout = (req, res, next) => {
  req.session.destroy((err) => {
    console.log(err);
    res.redirect("/");
  });
};
