/// Global Variables
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

// Start the Server
// Set app middlewares
app.use(express.json());

// Routes
const usersRouter = require("./routes/users");
app.use("/users", usersRouter);

// Login

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

app.listen(process.env.PORT, () =>
  console.log(`Server is Listening on Port ${process.env.PORT}`)
);
