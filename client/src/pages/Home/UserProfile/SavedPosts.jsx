import React from "react";

export default function SavedPosts() {
  return (
    <div>
      <h2 className="font-bold text-base font-secondary leading-loose">
        Saved Posts
      </h2>
      <ul className="flex items-center gap-4">
        <li className="w-48 flex flex-col my-4 shadow-md hover:shadow-lg duration-200 bg-white p-4">
          <img className="w-full h-24 object-cover" />
          <h3 className="font-secondary font-bold">Syal ra Bagh ko katha</h3>
          <p className="text-xs">
            -by Bagheshwori Pathak. Ekadesh ma euta jungle ma bagh ra syal...
          </p>
        </li>
        <li className="w-48 flex flex-col my-4 shadow-md hover:shadow-lg duration-200 bg-white p-4">
          <img className="w-full h-24 object-cover" />
          <h3 className="font-secondary font-bold">Syal ra Bagh ko katha</h3>
          <p className="text-xs">
            -by Bagheshwori Pathak. Ekadesh ma euta jungle ma bagh ra syal...
          </p>
        </li>
        <li className="w-48 flex flex-col my-4 shadow-md hover:shadow-lg duration-200 bg-white p-4">
          <img className="w-full h-24 object-cover" />
          <h3 className="font-secondary font-bold">Syal ra Bagh ko katha</h3>
          <p className="text-xs">
            -by Bagheshwori Pathak. Ekadesh ma euta jungle ma bagh ra syal...
          </p>
        </li>
      </ul>
    </div>
  );
}
