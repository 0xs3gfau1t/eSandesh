import React from "react";
import { Link } from "react-router-dom";
import { GiBrazilFlag } from "react-icons/gi";
import { GrFlagFill } from "react-icons/gr";

export default function SportsHighlights() {
  return (
    <div>
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-primary font-semibold leading-loose">
          Sports News
        </h2>
        <p className="font-semibold text-xs hover:after:content-['->'] transition-all">
          <Link to="***link this to sports section or particular match news***">
            See all
          </Link>
        </p>
      </div>
      <div className="flex flex-col gap-4 flex-wrap bg-white rounded-lg p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-center">
            {/* <img
              className="w-12 mr-2"
              src="https://thumbs.dreamstime.com/b/placeholder-icon-vector-isolated-white-background-your-web-mobile-app-design-placeholder-logo-concept-placeholder-icon-134071364.jpg"
            /> */}
            <span className="w-8 h-8 mx-2 flex justify-center items-center">
              <GiBrazilFlag />
            </span>
            <span>Brazil</span>&nbsp;
          </div>
          <span className="font-semibold">1</span>
        </div>
        <div className="flex w-full gap-4 px-4 items-center">
          <span>vs</span>
          <span>Full time</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-center">
            {/* <img
              className="w-8 h-8 mr-4"
              src="https://thumbs.dreamstime.com/b/placeholder-icon-vector-isolated-white-background-your-web-mobile-app-design-placeholder-logo-concept-placeholder-icon-134071364.jpg"
            /> */}
            <span className="w-8 h-8 mx-2 flex justify-center items-center">
              <GrFlagFill />
            </span>
            <span>Croatia</span>&nbsp;
          </div>
          <span className="font-semibold">1</span>
        </div>
      </div>
    </div>
  );
}
