import React from "react";

export default function sideNavBar() {
  return (
    <div>
      <nav>
        <ul className="list-none flex justify-between gap-8">
          <Link to={"/"}>
            <li>Home</li>
          </Link>
          <Link to={"trending"}>
            <li>Trending</li>
          </Link>
          <Link to={"global"}>
            <li>Global</li>
          </Link>
          <Link to={"/business"}>
            <li>Business</li>
          </Link>
          <Link to={"/politics"}>
            <li>Politics</li>
          </Link>
          <Link to={"/finance"}>
            <li>Finance</li>
          </Link>
          {/* <Link to={"/economy"}>
            <li>Economy</li>
          </Link> */}
          <Link to={"/sports"}>
            <li>Sports</li>
          </Link>
          <Link to={"/entertainment"}>
            <li>Entertainment</li>
          </Link>
        </ul>
      </nav>
    </div>
  );
}
