/**========================================================================
 *                           IMPORTS
 *========================================================================**/
import "./sass/globals.css";
import { default as Navbar } from "./components/Navbar.js";
/**======================
 *    METADATA
 *========================**/
export const metadata = {
  title: "Work Project One",
  description: "Work Project One Description",
};

/**========================================================================
 *                           APP
 *========================================================================**/
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
