import React from "react";
import { useParams } from "react-router-dom";

import { SideNavBar } from "../../components";
import Content from "./Content";

export default function Category() {
  const { categoryName } = useParams();
  console.log(categoryName);
  return (
    <div className="flex justify-between container gap-4">
      <div className="hidden sm:block">
        <SideNavBar activeCategory={categoryName} />
      </div>
      <div className=" w-11/12 md:1/2 mx-auto">
        <Content category={categoryName} />
      </div>
      <div className="hidden sm:block pr-4">
        {/* ads go here */}
        <div className="my-4 hidden lg:block">
          <a
            href={"https://media.tenor.com/IRcIGzwz7IQAAAAC/money-wallet.gif"}
            target="_blank"
          >
            <div className=" h-64 bg-darkblue w-52 text-white flex flex-col justify-center items-center ">
              <p>Click here for $100</p>
              <p className="text-sm text-center">
                This is a {categoryName} type of advertisement.
              </p>
            </div>
          </a>
        </div>
        <div className="my-4 hidden lg:block">
          <a
            href={"https://media.tenor.com/IRcIGzwz7IQAAAAC/money-wallet.gif"}
            target="_blank"
          >
            <div className=" h-64 bg-darkblue w-52 text-white flex justify-center items-center ">
              Click here for $100
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}
