import { useState } from "react"
import { BsFillPlusSquareFill } from "react-icons/bs"

import { Popup } from "../../components/common"
import { FormText, FormTextArea } from "../../components/common"

const initState = {
	name: "",
	newsTitle: "",
	content: "",
	article: "",
}

const ManageCritics = () => {
	const [prop, setProp] = useState(initState)
	const [show, setShow] = useState(false)

	const handleChange = e => {
		setProp({ ...prop, [e.target.name]: e.target.value })
	}
	const onSubmit = e => {}

	return (
		<>
			<div className="addNew" onClick={() => setShow(true)}>
				<BsFillPlusSquareFill className="ml-4 text-[1.8rem] " />
				<h2>Add critic</h2>
			</div>

			{show && (
				<Popup title={"Add new Ad"} setShow={setShow}>
					<FormText
						type="text"
						name="name"
						value={prop.name}
						labelText="Name critic"
						handleChange={handleChange}
					/>
					<FormText
						type="text"
						name="newsTitle"
						value={prop.newsTitle}
						labelText="News Title"
						handleChange={handleChange}
					/>
					<FormTextArea
						rows={8}
						cols={28}
						type="text"
						name="content"
						value={prop.content}
						labelText="Comment"
						handleChange={handleChange}
					/>
					<FormText
						type="text"
						name="article"
						value={prop.article}
						labelText="Article id"
						handleChange={handleChange}
					/>
					<button
						className="bg-darkblue text-white"
						onClick={onSubmit}
					>
						Save
					</button>
				</Popup>
			)}

			<div className="flex flex-col">
				<div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
					<div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
						<div className="overflow-hidden">
							<table className="newsListTable min-w-full table-auto">
								<thead className="border-b">
									<tr>
										<th scope="col">#</th>
										<th scope="col">News Title</th>
										<th scope="col">Person Name</th>
										<th scope="col">Likes</th>
										<th scope="col">Categories</th>
										<th scope="col">Actions</th>
									</tr>
								</thead>
							</table>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default ManageCritics
