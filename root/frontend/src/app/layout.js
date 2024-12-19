/**========================================================================
 *                           IMPORTS
 *========================================================================**/
import "./sass/globals.css";
import { default as Navbar } from "./components/Navbar.js";
import { Poppins } from "next/font/google";
const poppins = Poppins({
  weight: "200",
  style: "normal",
  display: "swap",
});
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;
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
      <body className={poppins.className}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
