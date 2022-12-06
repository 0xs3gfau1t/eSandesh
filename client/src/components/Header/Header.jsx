import React from "react";
import { SiteLogo } from "../common";
import { FaRegUserCircle } from "react-icons/fa";
import Forex from "./Forex";
import { Link } from "react-router-dom";
import GoldSilver from "./GoldSilver";

export default function Header() {
  return (
    <div className="border border-red-700 font-primary flex justify-between items-center">
      <SiteLogo />
      <Forex />
      <GoldSilver />
      <Link to="/account">
        <FaRegUserCircle />
      </Link>
    </div>
  );
}
