import React from "react";

import { LikeSaveShare } from "../../components/common";
import SideNewsList from "./SideNewsList";
import SideScrollNewsSection from "./SideScrollNewsSection";

export default function EachCategoryPreview({ category }) {
  return (
    <>
      <h1 className="text-4xl font-bold leading-loose">
        Trending in {category}
      </h1>
      <div className="flex mb-10 pb-4">
        <div className="w-2/3">
          <img src="https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png" />
          <div className="flex items-end justify-between">
            <h1 className="text-3xl w-3/5 mt-2">Scientists have found Covid- 19</h1>
            <div className="flex items-center w-2/5">
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
            Top articles in {category}
          </h2>
          <SideNewsList category={"health"} />
        </div>
      </div>
      <div>
        <h1 className="font-semibold text-2xl leading-loose">
          More from {category}
        </h1>
        <SideScrollNewsSection category={"health"} />
      </div>
    </>
  );
}
