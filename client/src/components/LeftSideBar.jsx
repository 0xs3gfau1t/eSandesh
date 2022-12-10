import React from "react";
import NavBar from "./NavBar";
import TopCritics from "./Critics/TopCritics";

function LeftSideBar() {
  return (
    <div className="flex flex-col">
      <NavBar />
      <TopCritics />
    </div>
  );
}

export default LeftSideBar;
