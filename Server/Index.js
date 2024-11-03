/// Global Variables
// Flash
const flash = require("expr");
// Bcrypt
const bcrypt = require("bcrypt");
// Passport
const passport = require("passport");
const initializePassport = require("./passport-config");
initializePassport(passport, (email) => {
  users.find((user) => user.emailAddress === email);
});
// Express Session
const session = require("express-session");
// Dotenv
require("dotenv").config();
// Express Server
const express = require("express");
const app = express();
// MongoDB Database
const mongoose = require("mongoose"); //brew services start mongodb/brew/mongodb-community
mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection;
db.on("error", (err) => console.error(err));
db.once("open", () =>
  console.log(`Database is open on ${process.env.DATABASE_URL}`)
);
// Models

// Start the Server
// Passport session data
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }, // Set to true if using HTTPS in production
  })
);

// Set decoding
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded data

// Routes
const usersRoute = require("./routes/users");
const users = require("./models/users");
app.use("/users", usersRoute);

// Main route
app.get("/", (req, res) => {
  if (req.isAuthenticated()) {
    // User is already signed in
    res.redirect("/dashboard");
  }
});

app.listen(process.env.PORT, () =>
  console.log(`Server is Listening on Port ${process.env.PORT}`)
);
