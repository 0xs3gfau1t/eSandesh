import React from "react";
import { FaRegSave } from "react-icons/fa";

function Saved() {
  return (
    <li className="flex gap-4 items-center font-bold">
      <FaRegSave className="text-3xl" />
      <span>Saved</span>
    </li>
  );
}

export default Saved;
