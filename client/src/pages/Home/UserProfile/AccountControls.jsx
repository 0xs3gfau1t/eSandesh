import React from "react";

export default function AccountControls() {
  return (
    <div className="flex flex-col gap-3 w-full mt-auto">
      <h2 className="font-bold text-base font-secondary">Account Controls</h2>
      <button className="text-blue w-fit hover:bg-blue h-8 duration-200 hover:text-white">
        Reset Password
      </button>
      <button className="text-rose-600 w-fit hover:bg-red duration-200 hover:text-white h-8">
        Delete Account
      </button>
    </div>
  );
}
