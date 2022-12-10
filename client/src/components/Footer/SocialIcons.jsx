import React from "react"
import { FaFacebookF, FaTwitter, FaYoutube } from "react-icons/fa"

export default function SocialIcons() {
	return (
		<div className="flex gap-3 items-cente">
			<a href="https://www.facebook.com" target={"_blank"}>
				<span>
					<FaFacebookF className="text-2xl" />
				</span>
			</a>
			<a href="https://www.twitter.com" target={"_blank"}>
				<span>
					<FaTwitter className="text-2xl" />
				</span>
			</a>
			<a href="https://www.youtube.com" target={"_blank"}>
				<span>
					<FaYoutube className="text-2xl" />
				</span>
			</a>
		</div>
	)
}
