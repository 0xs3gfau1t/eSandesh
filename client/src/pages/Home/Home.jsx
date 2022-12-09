import React from "react";
import { Link } from "react-router-dom";

import { FaHandPointRight } from "react-icons/fa";
import { Outlet } from "react-router-dom";
import { Footer, Header, SideNavBar } from "../../components";
import {
  ArticlePreviewSm,
  LikeSaveShare,
  RectAds,
} from "../../components/common";
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
          <div className="mb-10 pb-4">
            {/* middle scrolling news under the hero section */}
            <h1 className="text-4xl font-bold leading-loose">
              Trending in Health
            </h1>
            <div className="flex mb-10 pb-4">
              <div className="w-2/3">
                <img src="https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png" />
                <div className="flex items-end justify-between">
                  <h1 className="text-3xl border border-blue w-3/5">
                    Scientists have found Covid- 19
                  </h1>
                  <div className="flex items-center border-red border w-2/5">
                    <span className="text-xs text-slate-400 w-1/2">
                      2020 March- 12
                    </span>
                    <LikeSaveShare
                      // articleId={}
                      likes={"100k"}
                      className="w-1/2"
                    />
                  </div>
                </div>
              </div>
              <div className="px-4 py-2">
                <h2 className="text-xl font-semibold leading-loose">
                  Top articles in Health
                </h2>
                <ul className="py-2">
                  <li className="flex">
                    <FaHandPointRight className="mt-1 mr-2" />
                    <span className="hover:text-rose-700 font-semibold transition-colors">
                      <Link to={"articleURL"}>
                        Walter White gets Cancer, from Staying in the sun
                      </Link>
                    </span>
                  </li>
                  <li className="flex">
                    <FaHandPointRight className="mt-1 mr-2" />
                    <span className="hover:text-rose-700 font-semibold transition-colors">
                      <Link to={"articleURL"}>Drink Warm Water</Link>
                    </span>
                  </li>
                </ul>
              </div>
            </div>
            <div>
              <h1 className="font-semibold text-2xl leading-loose">
                More from Health
              </h1>
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
          I think other category previews should be placed here ok
        </div>

        {/* end of middle news/ scrolling section */}
        <div className="w-2/5 sm:w-1/5">
          <SportsHighlights />
        </div>
      </div>
      <Footer />
    </div>
  );
}
