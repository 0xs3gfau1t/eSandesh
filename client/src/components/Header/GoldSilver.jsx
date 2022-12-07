import React from "react";

export default function GoldSilver() {
  return (
    <div className="grid grid-cols-3 gap-x-4 gap-y-2">
      {/* categories */}
      <span className="font-bold ">Gold Hallmark</span>
      <span className="font-bold ">Gold Tejabi - tola</span>
      <span className="font-bold ">Silver - tola</span>
      {/* rates */}
      <span>NPR. 99,902.16</span>
      <span>NPR. 99,400.61</span>
      <span>NPR. 1,385.10</span>
    </div>
  );
}
