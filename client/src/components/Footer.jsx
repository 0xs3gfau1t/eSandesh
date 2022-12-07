import React from "react";
import { SiteLogo } from "../components/common";
import { FaFacebookF, FaTwitter, FaYoutube } from "react-icons/fa";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="fixed bottom-0 w-full bg-[#D9D9D9] text-black p-4">
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4 md:grid-cols-4">
        {/* 1st column */}
        <div className="flex flex-col justify-center items-center sm:items-start lg:items-center gap-4 ">
          <div className="">
            <SiteLogo />
            <p>Khabar naya yug ko</p>
          </div>
          {/* social icons*/}
          <div className="flex gap-3 items-center">
            <a>
              <span>
                <FaFacebookF className="text-2xl" />
              </span>
            </a>
            <a>
              <span>
                <FaTwitter className="text-2xl" />
              </span>
            </a>
            <a>
              <span>
                <FaYoutube className="text-2xl" />
              </span>
            </a>
          </div>
        </div>
        {/* 2nd column */}
        <div className="flex flex-col md:items-center">
          <div>
            <h3 className="text-lg font-bold">Explore</h3>
            <ul className="text-slate-700 text-sm">
              <li>
                <Link to="/category/trending">
                  <a>Trending</a>
                </Link>
              </li>
              <li>
                <Link to="/category/global">
                  <a>Global</a>
                </Link>
              </li>
              <li>
                <Link to="/category/politics">
                  <a>Politics</a>
                </Link>
              </li>
              <li>
                <Link to="/category/finance">
                  <a>Finance</a>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        {/* 3rd column */}
        <div className="flex flex-col md:items-center">
          <div>
            <h3 className="text-lg font-bold">Important Links</h3>
            <div className="text-sm text-slate-700">
              <Link to="/advertisement">
                <a>
                  <p>Advertise With Us</p>
                </a>
              </Link>
              <Link to="/feedback">
                <a>
                  <p>Feedback</p>
                </a>
              </Link>
              <Link to="/about">
                <a>
                  <p>About Us</p>
                </a>
              </Link>
              <Link to="/contact">
                <a>
                  <p>Contact Us</p>
                </a>
              </Link>
            </div>
          </div>
        </div>
        {/* 4th column */}
        <div className="flex flex-col md:items-center">
          <div>
            <h3 className="text-lg font-bold">Contact</h3>
            <div className="text-sm text-slate-700">
              <p>eSandesh Publication</p>
              <p>Pokhara- 16, Kaski (44800)</p>
              <p>9881 442 441</p>
              <p>contact@esandesh.com.np</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Footer;
