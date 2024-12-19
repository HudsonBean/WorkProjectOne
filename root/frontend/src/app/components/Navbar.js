/**========================================================================
 *                           IMPORTS
 *========================================================================**/
import logo from "../assets/logo.png";
import Image from "next/image";
import Link from "next/link";

export default function Navbar({ Component, pageProps }) {
  return (
    <div className="navbar">
      <Link className="navbar-logo" href="/">
        <Image src={logo} alt="Logo" width={65} height={65} />
      </Link>
      <div className="navbar-links-primary"></div>
      <div className="navbar-links-secondary"></div>
      <li className="navbar-links"></li>
    </div>
  );
}
