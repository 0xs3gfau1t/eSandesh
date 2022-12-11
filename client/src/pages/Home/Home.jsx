<<<<<<< HEAD
import { HiArrowNarrowRight } from "react-icons/hi"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import { Outlet } from "react-router-dom"
=======
import React from "react";
// import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
>>>>>>> 612a846906c30647d5423916fead6849188beff7

import { Footer, Header, LeftSideBar, RightSideBar } from "../../components";

<<<<<<< HEAD
export default function Home() {
	const focus = useSelector(state => state.misc.focus)
=======
export default function Home(match) {
  const focus = useSelector((state) => state.misc.focus);
>>>>>>> 612a846906c30647d5423916fead6849188beff7

  return (
    <div className="flex flex-col h-screen">
      <Header />

      <div className="flex justify-between container">
        {/* left side */}
        {!focus && (
          <div className="sm:block hidden w-1/5">
            <LeftSideBar />
          </div>
        )}
         {/* if some category is active, it is rendered on outlet */}
        <div className={focus ? "" : "w-3/5"}>
          <Outlet />
        </div>
        {/* right side */}
        {!focus && (
          <div className="sm:w-1/5 sm:block hidden">
            <RightSideBar />
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
