import React from "react";
import { Link } from "react-router-dom";

export default function ExploreMenu() {
  return (
    <ul className="text-slate-700 text-sm">
      <li className="hover:text-rose-700">
        <Link to="/category/trending">Trending</Link>
      </li>
      <li className="hover:text-rose-700">
        <Link to="/category/global">Global</Link>
      </li>
      <li className="hover:text-rose-700">
        <Link to="/category/politics">Politics</Link>
      </li>
      <li className="hover:text-rose-700">
        <Link to="/category/sports">Sports</Link>
      </li>
    </ul>
  );
}
