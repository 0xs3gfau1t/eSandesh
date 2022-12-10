import React from "react";
import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";

export default function CriticCard({ name, body }) {
  return (
    <div className="flex flex-col items-center cursor-pointer hover:shadow-lg transition-shadow duration-300 bg-white mt-2 mb-4 rounded-lg py-4 px-4 mr-10 shadow-sm">
      <Link to="userProfie">
        {/*use user image instead of icon*/}
        <FaUserCircle className="text-5xl" />
      </Link>
      <h4 className="text-base font-medium leading-loose">{name}</h4>
      <p className="text-xs text-justify">"{body}"</p>
    </div>
  );
}
