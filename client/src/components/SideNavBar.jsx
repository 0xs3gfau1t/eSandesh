import React from "react";
import { Link } from "react-router-dom";

export default function sideNavBar() {
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
  const menuItems = categories.map((eachCat) => (
    <li className="hover:font-bold duration-200 my-2">
      <Link to={`/category/${eachCat.toLowerCase()}`}>
        <a>{eachCat}</a>
      </Link>
    </li>
  ));
  return (
    <div>
      <nav className="p-4 border-r-4 border-r-slate-500">
        <h2 className="font-primary font-bold text-2xl">Category</h2>
        <ul className="list-none flex flex-col p-4 justify-between">
          {menuItems}
        </ul>
      </nav>
    </div>
  );
}
