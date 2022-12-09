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
        <div className="w-1/5 sm:block hidden scroll">
          <SideNavBar />
        </div>

        {/* if some category is active, it is rendered on outlet */}
        {/* <Outlet /> */}

        {/* start of outlet */}
        <div className=" w-full sm:w-3/5 px-4">
          <div className="flex">
            <div className="w-full sm:w-2/3">
              <HomeHero />
            </div>
            <div className="w-1/3 sm:block hidden">
              <div className="px-4 py-2">
                <h2 className="text-2xl font-semibold leading-loose">
                  Recent News
                </h2>
                <RecentNews />
              </div>
            </div>
          </div>
          <h2 className="font-semibold text-2xl">Hottest Topics</h2>
          <SideScrollNewsSection category={"hot"} />
          <RectAds
            type={
              "ma X category sita relevent ad ho, Life Insurance garnuhos Y life insurance"
            }
          />
          <div className="mb-10 pb-4">
            {/* middle scrolling news under the hero section */}
            <EachCategoryPreview category="health" />
            <RectAds
              type={
                "ma X category sita relevent ad ho, Life Insurance garnuhos Y life insurance"
              }
            />
          </div>
          <div className="mb-10 pb-4">
            {/* middle scrolling news under the hero section */}
            <EachCategoryPreview category="technology" />
            <RectAds
              type={
                "ma X category sita relevent ad ho, Life Insurance garnuhos Y life insurance"
              }
            />
          </div>
          {/* other category previews go here */}
          I think other category previews
          should be placed here ok
          {/* end of categories preview / middle scrolling section ends here */}
        </div>

        {/* end of outlet */}
        <div className="sm:w-1/5 sm:block hidden">
          <SportsHighlights />
        </div>
      </div>
      <Footer />
    </div>
  );
}
