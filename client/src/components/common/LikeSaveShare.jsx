import React from "react";
import { BiAddToQueue, BiLike, BiShareAlt } from "react-icons/bi";

export default function LikeSaveShare({ likes }) {
  return (
    <div className="flex items-center gap-2">
      <span className="flex items-end cursor-pointer text-xl transition-all duration-200 hover:text-green-600">
        <BiLike />
        {<span className="text-xs">{likes}</span>}
      </span>
      <span className=" cursor-pointer text-xl transition-all duration-200 hover:text-orange-500">
        <BiAddToQueue />
      </span>
      <span className=" cursor-pointer text-xl transition-all duration-200 hover:text-sky-600 ">
        <BiShareAlt />
      </span>
    </div>
  );
}
