"use client"; // Add this directive to mark the component as a Client Component

/**========================================================================
 *                           IMPORTS
 *========================================================================**/
import logo from "../assets/logo.png";
import Image from "next/image";
import Link from "next/link";
import { Poppins } from "next/font/google";
import { usePathname } from "next/navigation";

const poppins = Poppins({
  weight: "500",
  style: "normal",
  display: "swap",
});

export default function Navbar() {
  const pathname = usePathname();

  return (
    <div className={`navbar ${poppins.className}`}>
      <div className="navbar-links-primary">
        <Link className="navbar-logo" href="/">
          <Image src={logo} alt="Logo" width={65} height={65} />
        </Link>
        <Link className={pathname === "/about" ? "active" : ""} href="/about">
          About
        </Link>
        <Link
          className={pathname === "/contact" ? "active" : ""}
          href="/contact"
        >
          Contact
        </Link>
      </div>
      <div className="navbar-links-secondary"></div>
      <li className="navbar-links"></li>
    </div>
  );
}
