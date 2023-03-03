import React from "react"

export default function GoldSilver() {
	return (
		<div className="grid grid-cols-3 gap-x-4 gap-y-2">
			{/* categories */}
			<div className="font-bold text-center flex items-center justify-center">छापावाल सुन</div>
			<div className="font-bold text-center flex items-center justify-center">तेजाबी सुन - तोला</div>
			<div className="font-bold text-center flex items-center justify-center">चाँदी - तोला</div>
			{/* rates */}
			<div className="text-center flex items-center justify-center">रु. ९९,९०२.१६</div>
			<div className="text-center flex items-center justify-center">रु. ९९,४००.६१</div>
			<div className="text-center flex items-center justify-center">रु. १,३८५.१०</div>
		</div>
	)
}
