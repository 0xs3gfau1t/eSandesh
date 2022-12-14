import React from "react";
import { Link } from "react-router-dom";
import { HiArrowNarrowRight } from "react-icons/hi";

function SeeAllBtn({ url }) {
  return (
    <Link to={url}>
      <p className="font-semibold text-base flex items-center group">
        सबै हेर्नुहोस्
        <HiArrowNarrowRight className="ml-1 opacity-0 group-hover:opacity-100 transition-all duration-200 ease-in-out" />
      </p>
    </Link>
  );
}

export default SeeAllBtn;
