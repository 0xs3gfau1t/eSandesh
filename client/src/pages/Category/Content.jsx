import React from "react";

import HeroSection from "./HeroSection";

export default function Content() {
  return (
    <div className="flex flex-col border border-black items-center gap-6">
      <HeroSection />
      <div className="flex">
        <div className="w-1/3">
          <img src="https://www.stoneculture.co.uk/wp-content/uploads/2016/12/Stone-Culture-Grey-Starlight-Sample.jpg" />
        </div>
        <div>
          <p>This happened due to this</p>
          <p>Read More...</p>
        </div>
      </div>
      <div className="flex border border-red">
        <div className="w-1/3">
          <img src="https://www.stoneculture.co.uk/wp-content/uploads/2016/12/Stone-Culture-Grey-Starlight-Sample.jpg" />
        </div>
        <div>
          <p>This happened due to this</p>
          <p>Read More...</p>
        </div>
      </div>
    </div>
  );
}
