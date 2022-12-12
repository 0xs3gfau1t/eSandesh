import React from "react";
import { TfiWrite } from "react-icons/tfi";

function UserArticles() {
  return (
    <li className="flex gap-4 items-center font-bold">
      <TfiWrite className="text-3xl" />
      <span>Articles</span>
    </li>
  );
}

export default UserArticles;
