import React from "react";
import { Link } from "react-router-dom";

export default function ArticlePreviewSm({
  title,
  summary,
  imgUrl,
  articleUrl,
}) {
  return (
    <div className="flex w-64 border-4 h-24 items-center lg:items-start justify-between gap-4 my-6">
      <Link to={articleUrl} className="w-20 h-20">
        <img src={imgUrl} />
      </Link>
      <div className="w-2/3 flex flex-col justify-between h-full">
        <h3 className="lg:text-md text-sm font-primary font-bold hover:text-rose-600 duration-300">
          <Link to={articleUrl}>{title}</Link>
        </h3>
        {/* <div className="hidden lg:block text-xs">{summary}</div> */}
      </div>
    </div>
  );
}
