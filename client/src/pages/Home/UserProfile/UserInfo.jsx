import React from "react";
import AccountControls from "./AccountControls";

export default function UserInfo() {
  return (
    <div>
      <h2 className="font-bold text-base font-secondary leading-loose">
        User Information
      </h2>
      <form className="grid grid-cols-2 w-full">
        {/* user section */}
        <div className="w-full">
          <label for="userName" className="flex flex-col my-3">
            <span className=" leading-relaxed">Full Name:</span>
            <input
              type="text"
              name="userName"
              className="w-48 p-2 text-xs bg-white rounded-sm text-neutral-600"
              placeholder="Enter new name"
            />
          </label>

          <label for="userEmail" className="flex flex-col my-2">
            <span className=" leading-relaxed">Email address:</span>
            <input
              type="email"
              name="userEmail"
              className="w-48 p-2 text-xs bg-white rounded-sm text-neutral-600"
              placeholder="Enter new email address"
            />
          </label>
        </div>
        {/* account section */}
        <AccountControls />
      </form>
    </div>
  );
}
