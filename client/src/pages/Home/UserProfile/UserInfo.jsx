import React from "react"
import AccountControls from "./AccountControls"

export default function UserInfo() {
	return (
		<div>
			<h2 className="font-bold text-base font-english leading-loose">
				User Information
			</h2>
			<form className="grid grid-cols-2 w-full">
				{/* user section */}
				<div className="w-full">
					<label htmlFor="userName" className="flex flex-col my-3">
						<span className=" leading-relaxed">Full Name:</span>
						<input
							type="text"
							name="userName"
							className="w-48 p-2 text-sm my-2 bg-white shadow-sm focus:shadow-xl rounded-md text-neutral-600"
							placeholder="Enter new name"
						/>
					</label>

					<label htmlFor="userEmail" className="flex flex-col my-2">
						<span className=" leading-relaxed">Email address:</span>
						<input
							type="email"
							name="userEmail"
							className="w-48 p-2 text-sm my-2 bg-white shadow-sm focus:shadow-xl rounded-md text-neutral-600"
							placeholder="Enter new email address"
						/>
					</label>
				</div>
				{/* account section */}
				<AccountControls />
			</form>
		</div>
	)
}