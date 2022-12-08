import React from "react";
import { BiAddToQueue, BiLike, BiShareAlt } from "react-icons/bi";

export default function LikeSaveShare() {
  return (
    <div className="flex gap-2">
      <span className=" cursor-pointer text-lg transition-all duration-200 hover:text-green-600">
        <BiLike />
      </span>
      <span className=" cursor-pointer text-lg transition-all duration-200 hover:text-orange-500">
        <BiAddToQueue />
      </span>
      <span className=" cursor-pointer text-lg transition-all duration-200 hover:text-sky-600 ">
        <BiShareAlt />
      </span>
    </div>
  );
}
