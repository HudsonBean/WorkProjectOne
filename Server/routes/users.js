/**============================================
 *               IMPORTS
 *=============================================**/
const express = require("express");
const router = express.Router();
const User = require("../schemas/user");

/**============================================
 *               ENDPOINTS
 *=============================================**/
/**=======================
 * *       GET USER BY ID
 *========================**/
router.get("/:id", getUser, async (req, res) => {
  res.status(200).send(res.user);
});

/**============================================
 *               MIDDLEWARES
 *=============================================**/
/**=======================
 * *       GET USER MIDDLEWARE
====================**/
async function getUser(req, res, next) {
  let user;
  try {
    user = await User.findById(req.params.id);
    if (user == null) {
      res.status(404).json({ message: "Couldn't find the user!" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.user = user;
  next();
}

module.exports = router;
