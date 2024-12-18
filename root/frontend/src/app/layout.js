/**========================================================================
 *                           IMPORTS
 *========================================================================**/

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
      <div></div>
      <body>{children}</body>
    </html>
  );
}
