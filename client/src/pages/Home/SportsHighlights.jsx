import React from "react";
import { Link } from "react-router-dom";

export default function SportsHighlights() {
  return (
    <div className="px-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-primary font-semibold leading-loose">
          Sports
        </h2>
        <p className="font-semibold text-xs hover:after:content-['->'] transition-all">
          <Link to="***link this to sports section or particular match news***">
            See all
          </Link>
        </p>
      </div>
      <div className="flex flex-col gap-4 flex-wrap">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-center">
            <img
              className="w-12"
              src="https://thumbs.dreamstime.com/b/placeholder-icon-vector-isolated-white-background-your-web-mobile-app-design-placeholder-logo-concept-placeholder-icon-134071364.jpg"
            />
            <span>Brazil</span>&nbsp;
          </div>
          <span className="font-semibold">0</span>
        </div>
        <div className="flex w-full gap-4 px-4 items-center">
          <span>vs</span>
          <span>Full time</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-center">
            <img
              className="w-12"
              src="https://thumbs.dreamstime.com/b/placeholder-icon-vector-isolated-white-background-your-web-mobile-app-design-placeholder-logo-concept-placeholder-icon-134071364.jpg"
            />
            <span>Brazil</span>&nbsp;
          </div>
          <span className="font-semibold">0</span>
        </div>
      </div>
    </div>
  );
}
