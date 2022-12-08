import React from "react";
import { Outlet } from "react-router-dom";
import { Footer, Header, SideNavBar } from "../../components";
import HomeHero from "./HomeHero";
import RecentNews from "./RecentNews";
import SportsHighlights from "./SportsHighlights";

export default function Home(match) {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex justify-between">
        <div className="w-1/5">
          <SideNavBar />{" "}
        </div>
        {/* if some category is active, it is rendered on outlet */}
        {/* <Outlet /> */}
        <div className="flex w-3/5">
          <div className="w-2/3">
            <HomeHero />
          </div>
          <div className="w-1/3">
            <RecentNews />
          </div>
        </div>
        <div className="w-1/5">
          <SportsHighlights />
        </div>
      </div>
      <Footer />
    </div>
  );
}
