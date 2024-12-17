/**========================================================================
 *                           IMPORTS
 *========================================================================**/
/**
 * Middleware for handling the /api/dev-post endpoint.
 */
export default (req, res, next) => {
  const str = req.body.message;
  const newStr = str.split("").reverse().join("");
  res.status(200).json({ message: newStr });
};
