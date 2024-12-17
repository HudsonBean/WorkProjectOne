/**========================================================================
 *                           IMPORTS
 *========================================================================**/
import colorsTheme from "./config/colors.js";
import { init } from "./app.js";

/**========================================================================
 *                           START SERVER
 *========================================================================**/
// Inject app instance and start the server.
const port = process.env.PORT || 3000;
init()
  .then((app) => {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`.info);
    });
  })
  .catch((error) => {
    console.error(`Error: ${error.message}`.failure);
    process.exit(1);
  });
