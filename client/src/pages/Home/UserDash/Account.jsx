import React from "react";
import { RiAccountPinBoxLine } from "react-icons/ri";

function Account() {
  return (
    <li className="flex gap-4 items-center font-bold">
      <RiAccountPinBoxLine className="text-3xl" />
      <span>Account</span>
    </li>
  );
}

export default Account;
