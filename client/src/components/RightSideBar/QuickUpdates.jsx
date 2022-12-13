import React from "react"
// import { Link } from "react-router-dom";
import { GiBrazilFlag } from "react-icons/gi"
import { GrFlagFill } from "react-icons/gr"

export default function QuickUpdates() {
	return (
		// <div>
		<div className="flex flex-col gap-4 flex-wrap bg-white rounded-lg p-6 shadow-sm">
			<h3 className="text-base underline-offset-4 underline text-center font-semibold">
				फिफा विश्वकप
				{/*this title changes according to current context/events */}
			</h3>
			<div className="flex items-center justify-between">
				<div className="flex items-center justify-center">
					{/* <img
              className="w-12 mr-2"
              src="https://thumbs.dreamstime.com/b/placeholder-icon-vector-isolated-white-background-your-web-mobile-app-design-placeholder-logo-concept-placeholder-icon-134071364.jpg"
            /> */}
					{/* remove span and use img above me */}
					<span className="w-8 h-8 mr-2 flex justify-center items-center">
						<GiBrazilFlag />
					</span>
					<span>ब्राजिल</span>&nbsp;
				</div>
				<span className="font-semibold">१</span>
			</div>
			<div className="flex w-full gap-4 pl-2 items-center">
				<span className="text-sm font-medium">विरुद्ध</span>
				<span className="text-sm font-medium">पूर्ण समय</span>
			</div>
			<div className="flex items-center justify-between">
				<div className="flex items-center justify-center">
					{/* <img
              className="w-8 h-8 mr-4"
              src="https://thumbs.dreamstime.com/b/placeholder-icon-vector-isolated-white-background-your-web-mobile-app-design-placeholder-logo-concept-placeholder-icon-134071364.jpg"
            /> */}
					<span className="w-8 h-8 mr-2 flex justify-center items-center">
						<GrFlagFill />
					</span>
					<span>क्रोएसिया</span>&nbsp;
				</div>
				<span className="font-semibold">१</span>
			</div>
		</div>
		// </div>
	)
}
