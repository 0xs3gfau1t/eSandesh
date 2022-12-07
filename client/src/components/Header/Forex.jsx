import React from "react";

export default function Forex() {
  return (
    <div className="grid grid-cols-3 gap-x-2">
      {/* row 1 */}
      <span className="text-right font-bold">Currency:</span>
      <span className=" font-bold">U.S. Dollar</span>
      <span className=" font-bold">U.K. Pound Sterling</span>
      {/* row 2 */}
      <span className=" text-right font-bold">Buy:</span>
      <span>130.57</span>
      <span>160.41</span>
      {/* row 3 */}
      <span className=" text-right font-bold">Sell:</span>
      <span>131.17</span>
      <span>161.15</span>
    </div>
  );
}
