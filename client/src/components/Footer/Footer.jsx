import React from "react";

import BelowFooter from "./BelowFooter";
import ContactDetails from "./ContactDetails";
import ExploreMenu from "./ExploreMenu";
import ImportantLinks from "./ImportantLinks";
import SiteIdentity from "./SiteIdentity";

function Footer() {
  return (
    <footer>
      <div className="mt-auto bg-[#D9D9D9] text-black p-4">
        <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4 md:grid-cols-4">
          {/* 1st column */}
          <div className="flex items-center justify-center">
            <SiteIdentity />
          </div>
          {/* 2nd column */}
          <div className="flex flex-col md:items-center">
            <div>
              <h3 className="text-lg font-bold">Explore</h3>
              <ExploreMenu />
            </div>
          </div>
          {/* 3rd column */}
          <div className="flex flex-col md:items-center">
            <div>
              <h3 className="text-lg font-bold">Important Links</h3>
              <ImportantLinks />
            </div>
          </div>
          {/* 4th column */}
          <div className="flex flex-col md:items-center">
            <div>
              <ContactDetails />
            </div>
          </div>
        </div>
      </div>
      <BelowFooter />
    </footer>
  );
}
export default Footer;