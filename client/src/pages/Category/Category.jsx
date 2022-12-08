import React from "react";
import { SideNavBar } from "../../components";
import { SqAds } from "../../components/common";
import Content from "./Content";

export default function Category() {
  return (
    <div className="flex justify-between container gap-4">
      <div className="hidden sm:block">{/* <SideNavBar/> */}</div>
      <div className=" w-11/12 md:w-1/2 mx-auto">
        <Content />
      </div>
      <div className="hidden sm:block px-4">
        {/* ads go here */}
        <SqAds />
        <SqAds />
      </div>
    </div>
  );
}
