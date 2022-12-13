import React from "react";
import { Link } from "react-router-dom";
import { FaUserCircle, FaFilter } from "react-icons/fa";

export default function ArchiveCard({ articleName = "जीवनको प्रेम", category ="Novel", date = "2022-09-12", content="व्लादिमीर अलेक्सेभिचले अन्तिम पटक उद्यमशीलता संस्थानको भारी ढोका बन्द गरे। संस्थानको संस्थापक र रेक्टरको रूपमा, उहाँ दुःखी हुनुहुन्थ्यो, तर उहाँले यसलाई बन्द गर्नुपर्‍यो।" }) {
  return (
    <div className="flex gap-2 flex-col items-center cursor-pointer border-b-2 hover:shadow-lg transition-shadow duration-300 bg-white mt-2 mb-4 rounded-lg py-4 px-4 mr-10 shadow-sm">
      <div className="flex items-center gap-2 justify-start w-full">
        {/* <Link to="userProfie">
          {// {use user image instead of icon} }
}
          <FaUserCircle className="text-4xl" />
        </Link> */}
        <div className="flex flex-col gap-1">
          <h4 className="text-sm font-secondary font-medium">{articleName}</h4>
          <div className="flex gap-2">
            <span className="text-xs font-thin">{date}</span>
            <span className="text-xs font-bold">{category}</span>
          </div>
        </div>
      </div>
      <p className="text-xm text-justify">{content}</p>
    </div>
  );
}
