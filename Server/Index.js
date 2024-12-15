/**============================================
 *               IMPORTS
 *=============================================**/
const express = require("express");
const expressFlash = require("express-flash");
const expressSession = require("express-session");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const cors = require("cors");
const dotenv = require("dotenv").config();
const helmet = require("helmet");
const morgan = require("morgan");
const compression = require("compression");
const colors = require("colors");
const bodyParser = require("body-parser");
const passport = require("passport");
const initializeLocalStrategy = require("./passport-config");
/**============================================
 *               SCHEMAS
 *=============================================**/
const user = require("./schemas/user");

/**============================================
 *               FUNCTIONS
 *=============================================**/
//* Passport local initialization strategy methods
initializeLocalStrategy(
  passport,
  async (email) => await user.find({ email: email }),
  async (id) => await user.find({ _id: id })
);

/**============================================
 *               START SERVER & BACKEND
 *=============================================**/

/**======================
 *    Start Server
 *========================**/

const app = express();
app.listen(process.env.PORT, () => {
  console.log(
    colors.blue.italic("Server is open on:\n") +
      colors.blue.bgBlack.bold.underline(
        `http://localhost:${process.env.PORT}/`
      )
  );
});

/**======================
 *    Start Database
 *========================**/
mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection;
db.on("error", (err) => console.error(err));
db.once("open", () => {
  console.log(
    colors.yellow(
      "Database is open on:\n" +
        colors.bold.bgBlack.yellow.underline(process.env.DATABASE_URL)
    )
  );
});

/**============================================
 *               APP MIDDLEWARE
 *=============================================**/
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  expressSession({
    secret: process.env.SESSION_SECRET, // Session secret for signing cookies
    resave: false, // Don't save session if it wasn't modified
    saveUninitialized: false, // Don't save uninitialized sessions
    cookie: {
      secure: false, // Set to `true` only if using HTTPS
      maxAge: 60000, // Optional: session expiration in milliseconds
    },
  })
);
app.use(expressFlash());
app.use(helmet());
app.use(morgan("dev"));
app.use(compression());
app.use(
  cors({
    origin: "http://localhost:5173",
    optionsSuccessStatus: 200,
    credentials: true,
  })
);
// passport
app.use(passport.initialize());
app.use(passport.session());

/**============================================
 *               ROUTES
 *=============================================**/
app.use("/users", require("./routes/users"));

/**============================================
 *               ENDPOINTS
 *=============================================**/

//* Testing endpoints
app.get("/dev_get", async (req, res) => {
  res.status(202).send("Hello World!");
});
app.post("/dev_post", async (req, res) => {
  console.log(req.body);
  res.send("Hello!");
});

/**=======================
 * *       LOGIN USER
 *========================**/
app.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      // If authentication fails, include the flash message in the response
      const messages = req.flash("error"); // Retrieve flash messages
      return res.status(401).json({
        redirect: "/login",
        message: messages[0] || info.message || "Authentication failed!",
      });
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      // Successful login
      return res.status(200).json({
        redirect: "/",
        message: "Success!",
      });
    });
  })(req, res, next);
});
/**=======================
 * *       LOGOUT USER
 *========================**/
app.post("/logout", (req, res) => {
  // Call paspport logout method
  req.logout((err) => {
    if (err) {
      return res.status(500).json({
        redirect: "/login",
        message: "Error, when trying to logout user!",
      });
    }

    // Destroy the session
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({
          redirect: "/login",
          message: "Error destroying session!",
        });
      }

      // Clear the session cookie
      res.clearCookie("connect.sid", { path: "/" });
      return res.status(200).json({ redirect: "/" });
    });
  });
});
/**=======================
 * *       REGISTER USER
 *========================**/
app.post("/register", async (req, res) => {
  // Grab data from request
  let { first, last, email, password, phoneNumber = undefined } = req.body;

  // Check if user already exists in the database
  if (await user.findOne({ email })) {
    return res.status(401).json({ message: "That email is already in use!" });
  }

  // Save the user
  const newUser = new user({
    name: {
      first,
      last,
    },
    email,
    password: await bcrypt.hash(password, 10),
    phoneNumber,
  });
  await newUser.save();

  // Sucess
  return res.status(201).json({ redirect: "/login" }); //todo  Auto log the user in
});

/**============================================
 *               API
 *=============================================**/
/**=======================
 * *       CURRENT USER
 *========================**/
app.get("/api/current-user", async (req, res) => {
  if (req.isAuthenticated()) {
    // Respond with user details if authenticated
    res.status(200).json({ user: req.user });
  } else {
    // Respond with 401 if not authenticated
    res.status(401).json({ message: "Not authenticated" });
  }
});
