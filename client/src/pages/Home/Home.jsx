import React from "react";
import { Outlet } from "react-router-dom";
import { Footer, Header, SideNavBar } from "../../components";
import { ArticlePreviewSm, RectAds } from "../../components/common";
import HomeHero from "./HomeHero";
import RecentNews from "./RecentNews";
import SportsHighlights from "./SportsHighlights";

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
        <div className=" w-3/5 sm:w-3/5 px-4">
          <div className="flex">
            <div className="w-full sm:w-2/3">
              <HomeHero />
            </div>
            <div className="w-1/3 sm:block hidden">
              <RecentNews />
            </div>
          </div>
          <div>
            <h1 className="font-semibold text-2xl">Hottest Topics</h1>
            <div className="flex items-start justify-between gap-4 overflow-x-scroll">
              <ArticlePreviewSm
                title={"Maanis harayeko suchana"}
                summary={
                  "26/ F, Suntali Pandey, Call: 9812347599, Last seen at WRC gate"
                }
                imgUrl={
                  "http://kunjanaghimire.com/storage/images/kunjana-hero-2.png"
                }
                articleUrl={"yo artikle ko link hai ta ya"}
              />
              <ArticlePreviewSm
                title={"Maanis harayeko suchana"}
                summary={
                  "26/ F, Suntali Pandey, Call: 9812347599, Last seen at WRC gate"
                }
                imgUrl={
                  "http://kunjanaghimire.com/storage/images/kunjana-hero-2.png"
                }
                articleUrl={"yo artikle ko link hai ta ya"}
              />
              <ArticlePreviewSm
                title={"Maanis harayeko suchana"}
                summary={
                  "26/ F, Suntali Pandey, Call: 9812347599, Last seen at WRC gate"
                }
                imgUrl={
                  "http://kunjanaghimire.com/storage/images/kunjana-hero-2.png"
                }
                articleUrl={"yo artikle ko link hai ta ya"}
              />
              <ArticlePreviewSm
                title={"Maanis harayeko suchana"}
                summary={
                  "26/ F, Suntali Pandey, Call: 9812347599, Last seen at WRC gate"
                }
                imgUrl={
                  "http://kunjanaghimire.com/storage/images/kunjana-hero-2.png"
                }
                articleUrl={"yo artikle ko link hai ta ya"}
              />
              <ArticlePreviewSm
                title={"Maanis harayeko suchana"}
                summary={
                  "26/ F, Suntali Pandey, Call: 9812347599, Last seen at WRC gate"
                }
                imgUrl={
                  "http://kunjanaghimire.com/storage/images/kunjana-hero-2.png"
                }
                articleUrl={"yo artikle ko link hai ta ya"}
              />
              <ArticlePreviewSm
                title={"Maanis harayeko suchana"}
                summary={
                  "26/ F, Suntali Pandey, Call: 9812347599, Last seen at WRC gate"
                }
                imgUrl={
                  "http://kunjanaghimire.com/storage/images/kunjana-hero-2.png"
                }
                articleUrl={"yo artikle ko link hai ta ya"}
              />
            </div>
          </div>
          <RectAds
            type={
              "ma X category sita relevent ad ho, Life Insurance garnuhos Y life insurance"
            }
          />
        </div>
        {/* end of middle news/ scrolling section */}
        <div className="w-2/5 sm:w-1/5">
          <SportsHighlights />
        </div>
      </div>
      {/* other top articles */}
      <div></div>
      <Footer />
    </div>
  );
}
