/**========================================================================
 *                           IMPORTS
 *========================================================================**/
/**
 * Middleware for handling the /api/dev-post endpoint.
 */
export default (req, res, next) => {
  console.log(req.data);
};
