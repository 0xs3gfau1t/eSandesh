import React from "react";
import { Link } from "react-router-dom";

export default function ImportantLinks() {
  return (
    <ul className="text-sm text-slate-700">
      <li className="hover:text-rose-700">
        <Link to="/advertisement">Advertise With Us</Link>
      </li>

      <li className="hover:text-rose-700">
        <Link to="/feedback">Feedback</Link>
      </li>

      <li className="hover:text-rose-700">
        <Link to="/about">About Us</Link>
      </li>

      <li className="hover:text-rose-700">
        <Link to="/contact">Contact Us</Link>
      </li>
    </ul>
  );
}
