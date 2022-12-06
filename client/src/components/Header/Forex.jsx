import React from "react";

export default function Forex() {
  return (
    <div className="grid grid-cols-3 gap-x-4">
      {/* row 1 */}
      <span>Currency</span>
      <span>U.S. Dollar</span>
      <span>U.K. Pound Sterling</span>
      {/* row 2 */}
      <span>Buy</span>
      <span>130.57</span>
      <span>160.41</span>
      {/* row 3 */}
      <span>Sell</span>
      <span>131.17</span>
      <span>161.15</span>
    </div>
  );
}
