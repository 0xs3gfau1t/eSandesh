import React from "react";
import { Link } from "react-router-dom";

export default function HeroSection() {
  return (
    <div className="w-full mb-10">
      <h1 className="text-4xl font-primary font-bold my-2">
        Trending in Business
      </h1>
      <p className="w-full">
        <img
          className="w-full"
          src="https://warnaturbo.b-cdn.net/tutorial/wp-content/uploads/2020/07/01-Add-Change-Picture-in-Image-Placeholder-in-PowerPoint-Template-WarnaSlides.com_.jpg"
        />
      </p>
      <div className="">
        <h1 className="text-3xl font-semibold my-2">
          <Link to="/category/*/*" className="hover:text-rose-600 duration-300">
            Elon Musk Buys Twitter
          </Link>
        </h1>
        <div>Tesla CEO Elon Musk has bought Twitter today for $123456789</div>
      </div>
    </div>
  );
}
