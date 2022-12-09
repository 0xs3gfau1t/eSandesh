import { useState } from "react"
import { useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import { BsFillPlusSquareFill } from "react-icons/bs"

import { FormText, FormSelect } from "../../components/common"
import { Popup } from "../../components/common"
import { createAd } from "../../redux/actions/ads"

const initState = {
	name: "",
	category: "",
	imageEmbedUrl: "",
	priority: 10,
	size: "",
	redirectUrl: "",
	expiry: 1,
}

export default function AdsMan() {
	const [prop, setProp] = useState(initState)
	const [show, setShow] = useState(false)
	const dispatch = useDispatch()

	const handleChange = e => {
		setProp({ ...prop, [e.target.name]: e.target.value })
	}
	const onSubmit = e => {
		dispatch(createAd(prop))
		setProp(initState)
		setTimeout(() => {
			setShow(false)
		}, 3000)
	}
	return (
		<div className="mx-8">
			<div className="addNew" onClick={() => setShow(true)}>
				<BsFillPlusSquareFill className="ml-4 text-[1.8rem] " />
				<h2>Add new ad</h2>
			</div>
			{show && (
				<Popup title={"Add new Ad"} setShow={setShow}>
					<FormText
						type="text"
						name="name"
						value={prop.name}
						labelText="Name of Company"
						handleChange={handleChange}
					/>
					<FormText
						type="text"
						name="imageEmbedUrl"
						value={prop.imageEmbedUrl}
						labelText="Image URL for Ad"
						handleChange={handleChange}
					/>
					<FormText
						type="text"
						name="redirectUrl"
						value={prop.redirectUrl}
						labelText="Target URL for Ad"
						handleChange={handleChange}
					/>

					<FormSelect
						name="size"
						labelText="Ad size"
						options={["rectX", "rectY", "square"]}
						handleChange={handleChange}
					/>
					<FormText
						type="text"
						name="category"
						value={prop.category}
						labelText="Category"
						handleChange={handleChange}
					/>
					<div className="flex gap-4">
						<FormText
							type="number"
							name="priority"
							value={prop.priority}
							labelText="Priority"
							handleChange={handleChange}
						/>
						<FormText
							type="number"
							name="expiry"
							value={prop.expiry}
							labelText="Expire after ? days"
							handleChange={handleChange}
						/>
					</div>
					<button
						className="bg-darkblue text-white"
						onClick={onSubmit}
					>
						Save
					</button>
				</Popup>
			)}

			<div className="flex flex-col">
				<div className="overflow-x-auto">
					<div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
						<div className="overflow-hidden">
							<table className="newsListTable min-w-full table-auto">
								<thead className="border-b">
									<tr>
										<th scope="col">#</th>
										<th scope="col">Company</th>
										<th scope="col">Image URL</th>
										<th scope="col">Redirect URL</th>
										<th scope="col">Priority</th>
										<th scope="col">Hits</th>
										<th scope="col">Categories</th>
										<th scope="col">Size</th>
										<th scope="col">Last Modified</th>
										<th scope="col">Expiry Date</th>
										<th scope="col">Actions</th>
									</tr>
								</thead>
							</table>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
