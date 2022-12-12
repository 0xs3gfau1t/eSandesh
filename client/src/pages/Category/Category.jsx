import React from "react";
// import { SideNavBar } from "../../components";
import { SqAds } from "../../components/common";
import RecentNews from "../Home/RecentNews";
import Content from "./Content";

export default function Category() {
  return (
    <div className="flex justify-between">
      {/* left-side that contains news */}
      <div className=" w-2/3">
        <Content />
      </div>
      {/* right side */}
      <div className="hidden w-1/3 sm:flex flex-col items-center px-4">
        {/* ads go here */}
        <SqAds />
        <SqAds />
      </div>
    </div>
  );
}
