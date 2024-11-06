/// Global Variables
// Crypto
const crypto = require("crypto");
// Bcrypt
const bcrypt = require("bcrypt");
// Express-flash
const flash = require("express-flash");
// Cors
const cors = require("cors");
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
initialize(
  passport,
  (email) => db.collections.users.find({ email: email }).toArray(),
  (id) => db.collections.users.find({ _id: id }).toArray()
);

// Start the Server
// Set app middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
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
app.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "http://localhost:5173/",
    failureRedirect: "http://localhost:5173/login",
    failureFlash: true,
  })
);

// Register
app.post("/register", async (req, res) => {
  try {
    const phoneNumber = req.body.phoneNumber
      ? await encrypt(req.body.phoneNumber)
      : undefined;

    const user = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      userName: req.body.userName,
      email: req.body.email,
      password: await bcrypt.hash(req.body.password, 13),
      profilePicture: req.body.firstName,
      phoneNumber, // Set encrypted phone number here
      billingInfo: req.body.billingInfo, // Implement later
      websites: req.body.websites, // Implement later
      activePlan: req.body.activePlan,
      accountCreationDate: req.body.accountCreationDate,
      preferences: req.body.preferences,
    });

    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
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
