import React from "react";
import { ArticlePreviewSm } from "../common";

function PreferredNews() {
  return (
    <div className="flex flex-col flex-wrap bg-white rounded-lg px-4 shadow-sm">
      <ul>
        <li>
          <ArticlePreviewSm title={"Damauli hina maya maisanga ramauli"} />
        </li>
        <li>
          <ArticlePreviewSm
            title={"Rukum ko haana maya chauka daau hukum ko"}
          />
        </li>
      </ul>
    </div>
  );
}

export default PreferredNews;
