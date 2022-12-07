import React from "react";

import { SideNavBar } from "../../components";
import Content from "./Content";

export default function Category() {
  return (
    <div className="flex justify-between">
      <div className="invisible sm:visible">
        <SideNavBar />
      </div>
      <div className="w-4/5 md:w-1/2">
        <Content />
      </div>
      <div>Advertisements</div>
    </div>
  );
}
