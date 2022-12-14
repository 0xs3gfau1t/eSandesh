import React from "react"
import { Link } from "react-router-dom"
import { FaAngleDown } from "react-icons/fa"

export default function LocationNews() {
	return (
		<div className="group w-min">
			<span className="cursor-pointer text-xl font-normal flex items-center gap-1 bg-inherit relative ">
				स्थान <FaAngleDown />
			</span>
			<ul className="group-hover:visible invisible opacity-0 group-hover:opacity-100 duration-150 ease-out -mt-10 group-hover:-mt-3 absolute ml-14 w-48 bg-white p-2 leading-loose ">
				<li className="hover:font-bold duration-300 pl-2 hover:pl-5 hover:border-rose-700 border-l-4 border-transparent hover:text-rose-700">
					<Link to={"/category/province-1"}>प्रदेश १</Link>
				</li>
				<li className="hover:font-bold duration-300 pl-2 hover:pl-5 hover:border-rose-700 border-l-4 border-transparent hover:text-rose-700">
					<Link to={"/category/province-2"}>प्रदेश २ (मधेस)</Link>
				</li>
				<li className="hover:font-bold duration-300 pl-2 hover:pl-5 hover:border-rose-700 border-l-4 border-transparent hover:text-rose-700">
					<Link to={"/category/province-3"}>प्रदेश ३ (बागमती)</Link>
				</li>
				<li className="hover:font-bold duration-300 pl-2 hover:pl-5 hover:border-rose-700 border-l-4 border-transparent hover:text-rose-700">
					<Link to={"/category/province-4"}>प्रदेश ४ (गण्डकी)</Link>
				</li>
				<li className="hover:font-bold duration-300 pl-2 hover:pl-5 hover:border-rose-700 border-l-4 border-transparent hover:text-rose-700">
					<Link to={"/category/province-5"}>प्रदेश ५ (लुम्बिनी)</Link>
				</li>
				<li className="hover:font-bold duration-300 pl-2 hover:pl-5 hover:border-rose-700 border-l-4 border-transparent hover:text-rose-700">
					<Link to={"/category/province-6"}>प्रदेश ६ (कर्णाली)</Link>
				</li>
				<li className="hover:font-bold duration-300 pl-2 hover:pl-5 hover:border-rose-700 border-l-4 border-transparent hover:text-rose-700">
					<Link to={"/category/province-7"}>प्रदेश ७ (महाकाली)</Link>
				</li>
			</ul>
		</div>
	)
}
