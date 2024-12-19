/**========================================================================
 *                           IMPORTS
 *========================================================================**/
import logo from "../assets/logo.png";
import Image from "next/image";
import Link from "next/link";
import { Poppins } from "next/font/google";
const poppins = Poppins({
  weight: "500",
  style: "normal",
  display: "swap",
});

export default function Navbar({ Component, pageProps }) {
  return (
    <div className={`navbar ${poppins.className}`}>
      <div className="navbar-links-primary">
        <Link className="navbar-logo" href="/">
          <Image src={logo} alt="Logo" width={65} height={65} />
        </Link>
        <Link href="/about">About</Link>
        <Link href="/contact">Contact</Link>
      </div>
      <div className="navbar-links-secondary"></div>
      <li className="navbar-links"></li>
    </div>
  );
}
