const User = require("../models/user");
const ContactUs = require("../models/contactus");

exports.contactUs = (req, res, next) => {
  res.render("contactus", {
    pageTitle: "Contact Us",
    path: "/contactus",
    isAuthenticated: req.session.isLoggedIn,
  });
};

exports.postContactUs = (req, res, next) => {
  const user = req.user._id;
  const name = req.body.name;
  const email = req.body.email;
  const message = req.body.message;
  const number = req.body.number;

  const c = new ContactUs({
    name: name,
    email: email,
    message: message,
    number: number,
  });
  c.save().then((result) => {
    User.findById(user).then((user) => {
      user.contact.push(c);
      return user.save();
    });

    res.redirect("/contact");
  });
};

exports.getAllContactUs = (req, res, next) => {
  const user = req.user;
  User.find()
    .then((users) => {
      res.render("contactus", {
        pageTitle: "Contact Us",
        path: "/contactus",
        users: users,
        isAuthenticated: req.session.isLoggedIn,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
