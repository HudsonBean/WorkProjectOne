/// Global Variables
// Cors
const cors = require("cors");
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
// Passport

// Start the Server
// Set app middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// Routes
const usersRouter = require("./routes/users");
app.use("/users", usersRouter);

// Login
app.post("/login", async (req, res) => {
  res.status(202).json({
    message: "Successfully logged in ", // + req.user
    success: true,
  });
});

// Register
app.post("/register", async (req, res) => {
  const user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    userName: req.body.userName,
    email: req.body.email,
    //prettier-ignore
    password: await bcrypt.hash(req.body.password, 13), // Secure hash encrypt
    // Not required
    profilePicture: req.body.firstName,
    phoneNumber: !req.body.phoneNumber
      ? undefined
      : await encrypt(req.body.phoneNumber), // Encrypt phoneNumber
    billingInfo: req.body.billingInfo, // Implement later
    websites: req.body.websites, // Implement later
    activePlan: req.body.activePlan,
    accountCreationDate: req.body.accountCreationDate,
    preferences: req.body.preferences,
  });
  try {
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
