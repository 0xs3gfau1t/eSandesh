import React from "react";
import { SiteLogo } from "../common";
import Forex from "./Forex";
export default function Header() {
  return (
    <div className="border border-red-700 font-primary flex justify-between items-center">
      <SiteLogo />
      <Forex />
    </div>
  );
}
