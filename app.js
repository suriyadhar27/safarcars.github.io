require("./database/db");
const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const MongoDBstore = require("connect-mongodb-session")(session);
const User = require("./models/user");

const PORT = 5000;
const dbUrl = "mongodb://0.0.0.0:27017/tourist";
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const app = express();

//user session
const oSessionStore = new MongoDBstore({
  //calling constructor
  uri: dbUrl,
  collection: "usersessions",
});
app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use("/profile", express.static("upload/images"));

app.use(
  session({
    secret: "and and Tourist is awsome",
    resave: false,
    saveUninitialized: false,
    store: oSessionStore,
  })
);

//user store
app.use((req, res, next) => {
  if (!req.session.user) {
    return next();
  }
  User.findById(req.session.user._id)
    .then((user) => {
      req.user = user;
      req.isUserAuth = true;
      next();
    })
    .catch((err) => console.log(err));
});
//local variable
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.session.isLoggedIn;
  next();
});
app.use(authRoutes);
app.use(userRoutes);
app.get("/", (req, res) => {
  res.render("index", {
    pageTitle: "Home",
    path: "/",
    isAuthenticated: req.session.isLoggedIn,
    user: req.user,
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
