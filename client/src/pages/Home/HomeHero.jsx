import React from "react";

import { Link } from "react-router-dom";
import { LikeSaveShare } from "../../components/common";

export default function HomeHero({ data }) {
  const div = document.createElement("div");
  div.innerHTML = data ? data.content : "";
  const img = div.querySelector("img");

  return (
    <div className="mb-10 pb-4">
      <h1 className="text-5xl font-primary font-bold leading-loose">
        {/* heading */}
        आजको समाचार
        {/* Today's News */}
      </h1>
      <p className="w-full">
        {/* cover Img */}
        <img
          className="w-full"
          src={
            img
              ? img.src
              : "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png"
          }
        />
      </p>
      {/* below cover img */}
      <div>
        <h1 className="text-3xl my-2">
          <Link
            to={`/news/${data.year}/${data.month}/${data.slug}`}
            className="hover:text-rose-600 duration-300"
          >
            {/* article title */}
            {data.title}
          </Link>
        </h1>
        <div className="flex justify-between">
          <div>
            {/* short summary of article */}
            Summary short
          </div>
          <LikeSaveShare
            // articleId = {someArticleId}
            likes={"1.2k"}
          />
        </div>
      </div>
    </div>
  );
}
