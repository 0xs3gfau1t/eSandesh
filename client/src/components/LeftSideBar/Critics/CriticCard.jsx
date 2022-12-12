import React from "react";
import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";

export default function CriticCard({ articleRef, name, body }) {
  return (
    <div className="flex flex-col items-center cursor-pointer border-b-2 hover:shadow-lg transition-shadow duration-300 bg-white mt-2 mb-4 rounded-lg py-4 px-4 mr-10 shadow-sm">
      <div className="flex items-center gap-3 justify-start w-full">
        <Link to="userProfie">
          {/*use user image instead of icon*/}
          <FaUserCircle className="text-4xl" />
        </Link>
        <div className="flex flex-col">
          <h4 className="text-sm font-secondary font-medium">{name}</h4>
          <span className="text-xs font-thin">December 12, 2022</span>
        </div>
      </div>
      <h5
        className="text-xs font-secondary font-black leading-loose hover:text-rose-700 duration-300"
        title="Click to view full article"
      >
        {articleRef}
      </h5>
      <p className="text-xs text-justify">"{body}"</p>
    </div>
  );
}
