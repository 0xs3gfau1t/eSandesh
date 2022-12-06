import React from "react";
import { SiteLogo } from "../common";
import { FaRegUserCircle } from "react-icons/fa";
import Forex from "./Forex";
import { Link } from "react-router-dom";
import GoldSilver from "./GoldSilver";

export default function Header() {
  return (
    <div className="header font-primary flex justify-between items-center container p-3">
      <SiteLogo />
      <div className="flex justify-between items-center">
        <div className="flex justify-between gap-5">
          <Forex />
          <GoldSilver />
        </div>
        <Link to="/account">
          <FaRegUserCircle className=" text-3xl" />
        </Link>
      </div>
    </div>
  );
}
