import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { BsFillPlusSquareFill } from "react-icons/bs"

import { FormText, FormSelect } from "../../components/common"
import { Popup } from "../../components/common"
import { createAd, listAds } from "../../redux/actions/ads"

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
	const ads = useSelector(state => state.ads.adsList)
	const [prop, setProp] = useState(initState)
	const [show, setShow] = useState(false)
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(listAds())
	}, [])

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
							<table className="newsListTable min-w-full table-fixed w-screen">
								<thead className="border-b">
									<tr>
										<th>#</th>
										<th>Company</th>
										<th>Image URL</th>
										<th>Redirect URL</th>
										<th>Priority</th>
										<th>Hits</th>
										<th>Categories</th>
										<th>Size</th>
										<th>Last Modified</th>
										<th>Expiry Date</th>
										<th>Actions</th>
									</tr>
								</thead>
								<tbody>
									{ads &&
										ads.map((ad, index) => {
											return (
												<tr
													key={index}
													className="border-b"
												>
													<td>
														{parseInt(index) + 1}
													</td>
													<td>{ad.name}</td>
													<td className="text-ellipsis overflow-auto">
														<a
															target={"_blank"}
															href={
																ad.imageEmbedUrl
															}
														>
															{ad.imageEmbedUrl}
														</a>
													</td>
													<td className="text-ellipsis overflow-auto">
														<a
															target={"_blank"}
															href={
																ad.redirectUrl
															}
														>
															{ad.redirectUrl}
														</a>
													</td>
													<td>{ad.priority}</td>
													<td>{ad.hits}</td>
													<td>
														{ad.category.join(", ")}
													</td>
													<td>{ad.size}</td>
													<td>
														{new Date(
															ad.updatedAt
														).toLocaleDateString()}
													</td>
													<td>
														{new Date(
															ad.expiry
														).toLocaleDateString()}
													</td>
												</tr>
											)
										})}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
