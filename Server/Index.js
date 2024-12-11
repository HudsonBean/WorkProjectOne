/// Global Variables
// Crypto
const crypto = require("crypto");
// Bcrypt
const bcrypt = require("bcrypt");
// Express-flash
const flash = require("express-flash");
// Cors
const cors = require("cors");
const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
// Dotenv
require("dotenv").config();
// Express Server
const express = require("express");
const app = express();
// Express-session
const session = require("express-session");
// MongoDB Database
const mongoose = require("mongoose"); //brew services start mongodb/brew/mongodb-community
mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection;
db.on("error", (err) => console.error(err));
db.once("open", () => {
  console.log(`Database is open on ${process.env.DATABASE_URL}`);
});
// Passport
const passport = require("passport");
const initialize = require("./passport-config");
// Start the Server
// Set app middlewares
// Sets up the passport initialization middleware
initialize(
  passport,
  (email) => db.collections.users.find({ email: email }).toArray(),
  (id) => db.collections.users.find({ _id: id }).toArray()
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors(corsOptions));
app.use(flash());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Routes
const usersRouter = require("./routes/users");
app.use("/users", usersRouter);

// Schemas
const User = require("./schemas/user");

// Login
app.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) return next(err);
    if (!user) {
      // Send the flash message as part of the response
      return res.status(401).json({ message: info.message });
    }
    req.logIn(user, (err) => {
      if (err) return next(err);
      return res
        .status(200)
        .json({ message: "Login successful", redirect: "/" });
    });
  })(req, res, next);
});

// Register
app.post("/register", async (req, res) => {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: await bcrypt.hash(req.body.password, 13),
    profilePicture: req.body.profilePicture,
    phoneNumber: req.body.phoneNumber,
    role: req.body.role,
    creationDate: req.body.creationDate,
    preferences: req.body.preferences,

    // Security
    loginAttempts: req.body.loginAttempts, // Keep track of login attempts
    lockUntil: req.body.lockUntil, // Lock the login until implement later
  });

  const newUser = await user.save();
  res.status(201).json(newUser);
});

// Get current user from session
app.get("/api/current-user", (req, res) => {
  if (req.isAuthenticated()) {
    // Send back the user data, excluding sensitive information like the password
    res.json({
      id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      profilePicture: req.user.profilePicture,
      role: req.user.role,
      // Include other relevant user data here
    });
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
});

// Encryption functions
async function encrypt(text) {
  try {
    // Create new IV, decode key from .env file
    const iv = crypto.randomBytes(16);
    const key = Buffer.from(process.env.CRYPT_KEY, "hex");

    // Create encrypted message
    const cipher = crypto.createCipheriv(process.env.CRYPT_ALGORITHM, key, iv);
    let encrypted = cipher.update(text, "utf-8", "hex");
    encrypted += cipher.final("hex");

    // Save iv and encrypted data as hex strings
    return { iv: iv.toString("hex"), encryptedData: encrypted };
  } catch (err) {
    console.error("OOPS!\n" + err.message);
  }
}
async function decrypt(encryptedData, ivHex) {
  try {
    // Decrypt iv and key
    const iv = Buffer.from(ivHex, "hex");
    const key = Buffer.from(process.env.CRYPT_KEY, "hex");

    // Decrypt data
    const decipher = crypto.createDecipheriv(
      process.env.CRYPT_ALGORITHM,
      key,
      iv
    );
    let decrypted = decipher.update(encryptedData, "hex", "utf-8");
    decrypted += decipher.final("utf-8");

    return decrypted;
  } catch (err) {
    console.error("OOPS!\n" + err.message);
  }
}

app.listen(process.env.PORT, () =>
  console.log(`Server is Listening on Port ${process.env.PORT}`)
);
