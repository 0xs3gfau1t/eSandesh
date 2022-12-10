import React from "react";
import { Link } from "react-router-dom";

export default function RecentNews() {
  return (
    <ul className="flex flex-col justify-between gap-1 ">
      <li className="text-sm leading-loose hover:pl-4 font-semibold hover:text-rose-700 transition-all duration-300 hover:border-l-4 hover:border-rose-600 border-l-2 border-transparent">
        <Link to=""> Sukumbasi News ali lamo title ali lamotitle</Link>
      </li>
      <li className="text-sm leading-loose hover:pl-4 font-semibold hover:text-rose-700 transition-all duration-300 hover:border-l-4 hover:border-rose-600 border-l-2 border-transparent">
        <Link to=""> Pratinidhi Sabha</Link>
      </li>
      <li className="text-sm leading-loose hover:pl-4 font-semibold hover:text-rose-700 transition-all duration-300 hover:border-l-4 hover:border-rose-600 border-l-2 border-transparent">
        <Link to=""> Gham paani gham paani</Link>
      </li>
      <li className="text-sm leading-loose hover:pl-4 font-semibold hover:text-rose-700 transition-all duration-300 hover:border-l-4 hover:border-rose-600 border-l-2 border-transparent">
        <Link to=""> Syal ko bihe</Link>
      </li>
      <li className="text-sm leading-loose hover:pl-4 font-semibold hover:text-rose-700 transition-all duration-300 hover:border-l-4 hover:border-rose-600 border-l-2 border-transparent">
        <Link to=""> Chunab, Ghanti, Surya, Rukh, Ma0obadi</Link>
      </li>
    </ul>
  );
}
