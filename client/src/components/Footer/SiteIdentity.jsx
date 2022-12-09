import React from "react"
import { Link } from "react-router-dom"

import { SiteLogo } from "../common"
import SocialIcons from "./SocialIcons"

export default function SiteIdentity() {
<<<<<<< HEAD
	return (
		<div className="flex flex-col items-center sm:items-start gap-4">
			<div className="flex flex-col items-center sm:items-start">
				{/* site title and tagline */}
				<SiteLogo />
				<p>Khabar naya yug ko</p>
			</div>
			{/* social icons*/}
			<SocialIcons />
		</div>
	)
=======
  return (
    <div className="flex flex-col items-center sm:items-start gap-4">
      <div className="flex flex-col items-center sm:items-start">
        {/* site title and tagline */}
        <SiteLogo />
        <p>Khabar naya yug ko</p>
      </div>
      {/* social icons*/}
      <SocialIcons />
    </div>
  );
>>>>>>> 5d7d18214c3dda35a467b8a9ab63bcd21ac36b5a
}
