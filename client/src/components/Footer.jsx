import React from "react"
import { SiteLogo } from "../components/common"
import { FaFacebookF, FaTwitter, FaYoutube } from "react-icons/fa"
import { Link } from "react-router-dom"

function Footer() {
	return (
		<div className="mt-4 bg-[#D9D9D9] text-black p-4">
			<div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4 md:grid-cols-4">
				{/* 1st column */}
				<div className="flex flex-col justify-center items-center sm:items-start lg:items-center gap-4 ">
					<div className="">
						<SiteLogo />
						<p>Khabar naya yug ko</p>
					</div>
					{/* social icons*/}
					<div className="flex gap-3 items-center">
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
				</div>
				{/* 2nd column */}
				<div className="flex flex-col md:items-center">
					<div>
						<h3 className="text-lg font-bold">Explore</h3>
						<ul className="text-slate-700 text-sm">
							<li>
								<Link to="/category/trending">Trending</Link>
							</li>
							<li>
								<Link to="/category/global">Global</Link>
							</li>
							<li>
								<Link to="/category/politics">Politics</Link>
							</li>
							<li>
								<Link to="/category/sports">Sports</Link>
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
								<p>Advertise With Us</p>
							</Link>
							<Link to="/feedback">
								<p>Feedback</p>
							</Link>
							<Link to="/about">
								<p>About Us</p>
							</Link>
							<Link to="/contact">
								<p>Contact Us</p>
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
	)
}
export default Footer
