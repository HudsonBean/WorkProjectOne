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
// const passportLocal = require("passport-local");
/**======================
 *    SCHEMAS
 *========================**/
const user = require("./schemas/user");

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
  // Express Session Library for Managing Session
  expressSession({
    secret: process.env.SESSION_SECRET, // Session Data
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true, maxAge: 60000 },
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
app.use(passport.session());
app.use(passport.initialize());

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
 * *       REGISTER USER
 *========================**/
app.post("/register", async (req, res) => {
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
  const savedUser = await newUser.save();

  // Sucess
  return res.status(201).json({ redirect: "/login" }); //todo  Auto log the user in
});

/**======================
 *    PASSPORT ENDPOINTS
 *========================**/
