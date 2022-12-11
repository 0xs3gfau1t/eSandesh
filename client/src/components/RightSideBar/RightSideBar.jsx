import React from "react";
import { Link } from "react-router-dom";
import { HiArrowNarrowRight } from "react-icons/hi";

import PreferredNews from "./PreferredNews";
import QuickUpdates from "./QuickUpdates";

function RightSideBar() {
  return (
    <>
      <div className="flex justify-between items-end my-2">
        <h3 className="text-xl font-primary font-semibold">ताजा परिणामहरु</h3>
        <Link to="***link this to sports section or particular match news***">
          <p className="font-semibold text-xs flex items-center group">
            सबै हेर्नुहोस्
            <HiArrowNarrowRight className="ml-1 opacity-0 group-hover:opacity-100 transition-all duration-200 ease-in-out" />
          </p>
        </Link>
      </div>
      <QuickUpdates />

      {/* end of a section */}
      <div className="flex justify-between items-end mt-8 mb-2">
        <h3 className="text-xl font-primary font-semibold">
          तपाईंले पढेको सम्बन्धित
        </h3>
      </div>
      <PreferredNews />
      {/* end of a section */}
    </>
  );
}

export default RightSideBar;
