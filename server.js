const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const passport = require("passport");
const localStrategy = require("passport-local");
const session = require("express-session");
const mongoose = require("mongoose");
const User = require("./models/user");
const flash = require("connect-flash");

const userRoutes = require("./routes/users");
const kocampRoutes = require("./routes/kocamp");
const reviewRoutes = require("./routes/review");

const sessionConfig = {
  secret: "thisisshouldbebettersecret!",
  resave: false,
  saveUninitialized: true,
  HttpOnly: true,
};

const dotenv = require("dotenv"); // Define the dotenv package
dotenv.config(); // Call the config function

// if (process.env.NODE_ENV !== "production") {
//   require("dotenv").config();
// }

async function main() {
  mongoose.connect("mongodb+srv://yulsanohDev:tks82114125%40@kocamp.z80yyb8.mongodb.net/?retryWrites=true&w=majority");
}
main()
  .then(() => {
    console.log("Kocamp database connected");
  })
  .catch((err) => {
    console.log("OH NO!");
    console.log(err);
  });

app.engine("ejs", ejsMate);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));

app.use(session(sessionConfig));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate())); // app.use(session()) 이후에 위치해야함

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(flash());

app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated();
  res.locals.currentUser = req.user;
  next();
});

app.use("/", userRoutes);
app.use("/kocamps", kocampRoutes);
app.use("/kocamps/:id/reviews", reviewRoutes);

app.get("/fakeUser", async (req, res) => {
  const user = new User({
    email: "yulsanohDev@gmail.com",
    username: "yulsanoh",
  });
  const newUser = await User.register(user, "chicken");
  res.send(newUser);
});

app.get("/", (req, res) => {
  res.render("home.ejs");
});

app.listen(8080, () => {
  console.log("Kocamp connected on port 3000!");
});
