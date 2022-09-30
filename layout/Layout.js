import React from "react";
import MainNavigation from "./MainNavigation";
import c from "../layout/Layout.module.css";

function Layout(props) {
  return (
    <div>
      <MainNavigation />
      <main className={c.main}>{props.children}</main>
    </div>
  );
}

export default Layout;
