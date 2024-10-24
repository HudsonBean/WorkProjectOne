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
// Set decoding
app.use(express.json());

// Routes
const usersRouter = require("./routes/users");
app.use("/users", usersRouter);

app.listen(process.env.PORT, () =>
  console.log(`Server is Listening on Port ${process.env.PORT}`)
);
