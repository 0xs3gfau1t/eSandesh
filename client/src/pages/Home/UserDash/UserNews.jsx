import React from "react";
import { AiFillFileAdd } from "react-icons/ai";

function UserNews() {
  return (
    <li className="flex gap-4 items-center font-bold">
      <AiFillFileAdd className="text-3xl" />
      <span>News</span>
    </li>
  );
}

export default UserNews;
