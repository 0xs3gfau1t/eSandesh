import React from "react";
import { Link } from "react-router-dom";

import { FaHandPointRight } from "react-icons/fa";

export default function SideNewsList({ category }) {
  return (
    <ul className="py-2">
      <li className="flex">
        <FaHandPointRight className="mt-1 mr-2" />
        <span className="hover:text-rose-700 font-semibold transition-colors">
          <Link to={"articleURL"}>
            Walter White gets Cancer, from Staying in the sun({category})
          </Link>
        </span>
      </li>
      <li className="flex">
        <FaHandPointRight className="mt-1 mr-2" />
        <span className="hover:text-rose-700 font-semibold transition-colors">
          <Link to={"articleURL"}>Drink Warm Water({category})</Link>
        </span>
      </li>
    </ul>
  );
}
