import React from "react";
import { Link } from "react-router-dom";

export default function sideNavBar({ activeCategory }) {
  const categories = [
    "Admin", //remove admin from this list and add other category
    "Trending",
    "Global",
    "Business",
    "Politics",
    "Finance",
    "Sports",
    "Entertainment",
  ];
  const menuItems = categories.map((eachCat) => {
    if (eachCat.toLowerCase() == activeCategory) {
      return (
        <Link to={`/category/${eachCat.toLowerCase()}`}>
          <li
            className="text-darkblue font-bold hover:font-bold duration-200 hover:text-darkblue my-2"
            key={eachCat.toLowerCase()}
          >
            {eachCat}
          </li>
        </Link>
      );
    } else {
      return (
        <Link to={`/category/${eachCat.toLowerCase()}`}>
          <li
            className="hover:font-bold duration-200 hover:text-darkblue my-2"
            key={eachCat.toLowerCase()}
          >
            {eachCat}
          </li>
        </Link>
      );
    }
  });

  return (
    <div>
      <nav className="p-4 border-r-4 border-r-darkblue">
        <h2 className="font-primary font-bold text-2xl">Category</h2>
        <ul className="list-none flex flex-col p-4 justify-between">
          {menuItems}
        </ul>
      </nav>
    </div>
  );
}
