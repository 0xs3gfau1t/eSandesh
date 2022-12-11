import React from "react";
import { Link } from "react-router-dom";

export default function ArticlePreviewSm({
  title,
  // summary,
  imgUrl,
  articleUrl,
}) {
  return (
    <div className="flex p-2 min-w-[30%] max-w-fit bg-white rounded-md shadow-sm hover:shadow-md border-b-2 duration-200 h-32 items-center lg:items-start justify-between gap-4 my-6">
      <Link to={articleUrl}>
        <img src={imgUrl} className="rounded-sm w-20 h-20 object-cover" />
      </Link>
      <div className="w-2/3 flex flex-col justify-between h-full">
        <h3 className="lg:text-md text-sm font-secondary font-medium hover:text-rose-600 duration-300">
          <Link to={articleUrl}>{title}</Link>
        </h3>
        {/* <div className="hidden lg:block text-xs">{summary}</div> */}
      </div>
    </div>
  );
}
