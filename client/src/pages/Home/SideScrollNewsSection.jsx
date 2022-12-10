import React from "react";

import { ArticlePreviewSm } from "../../components/common";

export default function SideScrollNewsSection({ category }) {
  // if category="hot" or "home" show top news
  // if category="politics" show news from politics category
  return (
    <div className="flex items-start justify-between gap-4 overflow-x-scroll">
      <ArticlePreviewSm
        //   category={"politics"}
        title={"UML selects 34 HoR members under PR, politics, Nepal, 2079"}
        summary={"HoR - House of Representatives"}
        imgUrl={"http://kunjanaghimire.com/storage/images/kunjana-hero-2.png"}
        articleUrl={"yo artikle ko link hai ta ya"}
      />
      <ArticlePreviewSm
        title={"Maanis harayeko suchana"}
        summary={
          "26/ F, Suntali Pandey, Call: 9812347599, Last seen at WRC gate"
        }
        imgUrl={"http://kunjanaghimire.com/storage/images/kunjana-hero-2.png"}
        articleUrl={"yo artikle ko link hai ta ya"}
      />
      <ArticlePreviewSm
        title={"Maanis harayeko suchana"}
        summary={
          "26/ F, Suntali Pandey, Call: 9812347599, Last seen at WRC gate"
        }
        imgUrl={"http://kunjanaghimire.com/storage/images/kunjana-hero-2.png"}
        articleUrl={"yo artikle ko link hai ta ya"}
      />
      <ArticlePreviewSm
        title={"Maanis harayeko suchana"}
        summary={
          "26/ F, Suntali Pandey, Call: 9812347599, Last seen at WRC gate"
        }
        imgUrl={"http://kunjanaghimire.com/storage/images/kunjana-hero-2.png"}
        articleUrl={"yo artikle ko link hai ta ya"}
      />
      <ArticlePreviewSm
        title={"Maanis harayeko suchana"}
        summary={
          "26/ F, Suntali Pandey, Call: 9812347599, Last seen at WRC gate"
        }
        imgUrl={"http://kunjanaghimire.com/storage/images/kunjana-hero-2.png"}
        articleUrl={"yo artikle ko link hai ta ya"}
      />
      <ArticlePreviewSm
        title={"Maanis harayeko suchana"}
        summary={
          "26/ F, Suntali Pandey, Call: 9812347599, Last seen at WRC gate"
        }
        imgUrl={"http://kunjanaghimire.com/storage/images/kunjana-hero-2.png"}
        articleUrl={"yo artikle ko link hai ta ya"}
      />
    </div>
  );
}
