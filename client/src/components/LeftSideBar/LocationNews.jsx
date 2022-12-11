import React from "react";
import { Link } from "react-router-dom";
import { FaAngleDown } from "react-icons/fa";

export default function LocationNews() {
  return (
    <div className="group">
      <span className="cursor-pointer flex items-center gap-1 bg-inherit relative ">
        स्थान <FaAngleDown />
      </span>
      <ul className="group-hover:visible absolute ml-12 w-56 -mt-10 group-hover:-mt-4 bg-white p-2 leading-loose invisible opacity-0 group-hover:opacity-100 duration-300">
        <li className="hover:font-bold duration-300 pl-2 hover:pl-5 hover:border-rose-700 border-l-4 border-transparent hover:text-rose-700">
          <Link to={"/category/location/province-{}"}>प्रदेश १</Link>
        </li>
        <li className="hover:font-bold duration-300 pl-2 hover:pl-5 hover:border-rose-700 border-l-4 border-transparent hover:text-rose-700">
          <Link to={"/category/location/province-{}"}>प्रदेश २ (मधेस)</Link>
        </li>
        <li className="hover:font-bold duration-300 pl-2 hover:pl-5 hover:border-rose-700 border-l-4 border-transparent hover:text-rose-700">
          <Link to={"/category/location/province-{}"}>प्रदेश ३ (बागमती)</Link>
        </li>
        <li className="hover:font-bold duration-300 pl-2 hover:pl-5 hover:border-rose-700 border-l-4 border-transparent hover:text-rose-700">
          <Link to={"/category/location/province-{}"}>प्रदेश ४ (गण्डकी)</Link>
        </li>
        <li className="hover:font-bold duration-300 pl-2 hover:pl-5 hover:border-rose-700 border-l-4 border-transparent hover:text-rose-700">
          <Link to={"/category/location/province-{}"}>प्रदेश ५ (लुम्बिनी)</Link>
        </li>
        <li className="hover:font-bold duration-300 pl-2 hover:pl-5 hover:border-rose-700 border-l-4 border-transparent hover:text-rose-700">
          <Link to={"/category/location/province-{}"}>प्रदेश ६ (कर्णाली)</Link>
        </li>
        <li className="hover:font-bold duration-300 pl-2 hover:pl-5 hover:border-rose-700 border-l-4 border-transparent hover:text-rose-700">
          <Link to={"/category/location/province-{}"}>प्रदेश ७ (महाकाली)</Link>
        </li>
      </ul>
    </div>
  );
}