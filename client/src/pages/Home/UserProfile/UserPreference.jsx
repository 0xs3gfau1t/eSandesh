import React from "react";

export default function UserPreference() {
  return (
    <div>
      <h2 className="font-bold text-base font-english leading-loose">
        Preferences
      </h2>
      <div>
        <label className="flex flex-col">
          {/* <span className="leading-relaxed">Favourite Topics</span> */}
          <div className="flex items-center justify-start gap-2 my-2">
            <label htmlFor="preference">
              <input
                type="text"
                name="preference"
                className="w-44 p-2 bg-white shadow-sm focus:shadow-xl rounded-md"
              />
            </label>
            <button className="bg-green-400 h-10 rounded-md shadow-sm duration-300 transition-shadow hover:shadow-md border-none active:bg-green-500">
              Add
            </button>
          </div>
        </label>
      </div>
    </div>
  );
}
