import React from "react"

export default function Forex() {
	return (
		<div className="grid grid-cols-3 gap-x-2">
			{/* row 1 (heading) */}
			<span className="text-right font-bold">मुद्रा:</span>
			<span className=" font-bold">U.S. डलर</span>
			<span className=" font-bold">U.K. पाउन्ड स्टर्लिङ</span>
			{/* row 2 */}
			<span className=" text-right font-bold">खरिद:</span>
			<span>१३०.५७</span>
			<span>१६०.४१</span>
			{/* row 3 */}
			<span className=" text-right font-bold">बिक्री:</span>
			<span>१३१.१७</span>
			<span>१६१.१५</span>
		</div>
	)
}
