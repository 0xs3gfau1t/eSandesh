import React from "react";
import { Link } from "react-router-dom";

export default function RecentNews() {
  return (
    <div className="border border-green-700 px-4">
      <h2 className="text-2xl font-semibold leading-loose">RecentNews</h2>
      <ul className="flex flex-col">
        <li className="text-sm leading-loose before:content-['->'] hover:text-rose-700 transition-all duration-300 hover:border-l-2 hover:border-rose-600 border-l-2 border-transparent font-medium">
          <Link to=""> Sukumbasi News ali lamo title ali lamo title</Link>
        </li>
        <li className="text-sm leading-loose before:content-['->'] hover:text-rose-700 transition-all duration-300 hover:border-l-2 hover:border-rose-600 border-l-2 border-transparent font-medium">
          <Link to=""> Pratinidhi Sabha</Link>
        </li>
        <li className="text-sm leading-loose before:content-['->'] hover:text-rose-700 transition-all duration-300 hover:border-l-2 hover:border-rose-600 border-l-2 border-transparent font-medium">
          <Link to=""> Gham paani gham paani</Link>
        </li>
        <li className="text-sm leading-loose before:content-['->'] hover:text-rose-700 transition-all duration-300 hover:border-l-2 hover:border-rose-600 border-l-2 border-transparent font-medium">
          <Link to=""> Syal ko bihe</Link>
        </li>
        <li className="text-sm leading-loose before:content-['->'] hover:text-rose-700 transition-all duration-300 hover:border-l-2 hover:border-rose-600 border-l-2 border-transparent font-medium">
          <Link to=""> Chunab, Ghanti, Surya, Rukh, Ma0obadi</Link>
        </li>
      </ul>
    </div>
  );
}
