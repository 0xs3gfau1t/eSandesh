import React from "react";

import { Outlet } from "react-router-dom";
import { Footer, Header, SideNavBar } from "../../components";
import { RectAds } from "../../components/common";
import HomeHero from "./HomeHero";
import RecentNews from "./RecentNews";
import SportsHighlights from "./SportsHighlights";
import SideScrollNewsSection from "./SideScrollNewsSection";
import EachCategoryPreview from "./EachCategoryPreview";

export default function Home(match) {
  return (
    <div className="flex flex-col h-screen">
      <Header />

      <div className="flex justify-between container">
        <div className="sm:block hidden">
          <SideNavBar />
        </div>

        {/* if some category is active, it is rendered on outlet */}
        <Outlet />

        {/* start of outlet */}
      </div>
      <Footer />
    </div>
  );
}
