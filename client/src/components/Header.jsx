import React from "react";
import { Link } from "react-router-dom";
import siteLogo from "../images/icons/eSandesh-logo--dark.png";

export default function Header() {
  return (
    <div className="border border-red-700 font-primary flex justify-between items-center">
      <img
        src={siteLogo}
        className="w-40"
        alt="logo for eSandesh news portal"
      ></img>
      <nav>
        <ul className="list-none flex justify-between gap-8">
          <Link to={""}>
            <li>Home</li>
          </Link>
          <Link to={""}>
            <li>Trending</li>
          </Link>
          <Link to={""}>
            <li>Global</li>
          </Link>
          <Link to={""}>
            <li>Business</li>
          </Link>
          <Link to={"/politics"}>
            <li>Politics</li>
          </Link>
          <Link to={""}>
            <li>Finance</li>
          </Link>
          <Link to={""}>
            <li>Economy</li>
          </Link>
          <Link to={""}>
            <li>Sports</li>
          </Link>
          <Link to={""}>
            <li>Entertainment</li>
          </Link>
        </ul>
      </nav>
    </div>
  );
}
