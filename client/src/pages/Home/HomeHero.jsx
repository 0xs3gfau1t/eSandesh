import React from "react";
import { Link } from "react-router-dom";

export default function HomeHero() {
  return (
    <div className="mb-10 border border-red px-4">
      <h1 className="text-4xl font-primary font-bold leading-loose">
        Today's News
      </h1>
      <p className="w-full">
        <img
          className="w-full"
          src="https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png"
        />
      </p>
      <div className="">
        <h1 className="text-3xl font-semibold my-2">
          <Link to={""} className="hover:text-rose-600 duration-300">
            Title is here
          </Link>
        </h1>
        <div>Summary shot</div>
      </div>
    </div>
  );
}
