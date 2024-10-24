/// Global Variables
// Express Server
const express = require("express");
const app = express();

// Start the Server
app.use(express.json());
app.listen(3000, () => console.log(`Server is Listening on Port ${3000}`));
