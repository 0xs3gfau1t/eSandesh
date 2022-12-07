import React from "react";
import { SiteLogo } from "../components/common";
import { FaFacebookF, FaTwitter, FaYoutube } from "react-icons/fa";

function Footer() {
  return (
    <div className="fixed bottom-0 w-full bg-[#D9D9D9] text-black py-3">
      <div className="container m-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
        {/* 1st column */}
        <div className="flex flex-col  justify-center gap-4 ">
          <div>
            <SiteLogo />
            <p>Khabar naya yug ko</p>
          </div>
          <div className=" flex items-center justify-between w-12 gap-3">
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
        <div className="">
          <h3 className=" text-lg font-bold">Explore</h3>
          <ul className="text-slate-700 text-sm">
            <li>Trending</li>
            <li>Global</li>
            <li>Politics</li>
            <li>Finance</li>
          </ul>
        </div>
        {/* 3rd column */}
        <div>
          <h3 className="text-lg font-bold">Important Links</h3>
          <div className="text-sm text-slate-700">
            <a href="advertisement">
              <p>Advertise With Us</p>
            </a>
            <a href="feedback">
              <p>Feedback</p>
            </a>
            <a href="contact">
              <p>Contact Us</p>
            </a>
            <a href="about">
              <p>About Us</p>
            </a>
          </div>
        </div>
        {/* 4th column */}
        <div>
          <h3 className="text-lg font-bold">Contact</h3>
          <div className="text-sm text-slate-700">
            <p>eSandesh Publication</p>
            <p>Pokhara- 16, Kaski Nepal</p>
            <p>9881 442 441</p>
            <p>contact@esandesh.com.np</p>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Footer;
