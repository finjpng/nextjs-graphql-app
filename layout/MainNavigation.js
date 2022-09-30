import Link from "next/link";
import React from "react";
import c from "../layout/MainNavigation.module.css";
function MainNavigation() {
  return (
    <header className={c.header}>
      <div className={c.logo}>Nav</div>
      <nav>
        <ul>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/AddPage">Add New</Link>
          </li>
          <li>
            <Link href="/SearchPage">Search</Link>
          </li>
          {/* <li>
          <Link href="/favorites">Favorites</Link>
        </li> */}
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
