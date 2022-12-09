import React from "react";

export default function BelowFooter() {
  return (
    <div className=" bg-slate-600 text-slate-100 py-2 w-full">
      <div className="container flex items-center justify-center">
        Copyright &nbsp;&copy; {new Date().getFullYear()}&ensp;SegFault Inc.
      </div>
    </div>
  );
}
