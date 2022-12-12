import React from "react";
import { NavLink } from "react-router-dom";

import UserNews from "./UserNews";
import UserArticles from "./UserArticles";
import Account from "./Account";
import Saved from "./Saved";

function UserDashNav() {
  return (
    <ul className="border-4 flex flex-col gap-4 border-black bg-darkblue text-white p-2">
      <NavLink
        to="/admin/dashboard/"
        className={({ isActive }) => (isActive ? "bg-sky-600 font-bold" : "")}
      >
        <UserNews />
      </NavLink>
      <NavLink
        to="/admin/dashboard/"
        className={({ isActive }) => (isActive ? "bg-sky-600 font-bold" : "")}
      >
        <UserArticles />
      </NavLink>

      <NavLink
        to="/admin/dashboard/"
        className={({ isActive }) => (isActive ? "bg-sky-600 font-bold" : "")}
      >
        <Saved />
      </NavLink>

      <NavLink
        to="/admin/dashboard/"
        className={({ isActive }) => (isActive ? "bg-sky-600 font-bold" : "")}
      >
        <Account />
      </NavLink>
    </ul>
  );
}

export default UserDashNav;
