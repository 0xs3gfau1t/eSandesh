import { useState } from "react"
import { Link } from "react-router-dom"
import { BsFillPlusSquareFill } from "react-icons/bs"
import { FormText, FormSelect } from "../../components/common"
import { Popup } from "../../components/common"

const initState = {
	show: false,
	name: "",
	size: "",
	priority: 10,
	img_url: "",
	ad_url: "",
	category: "",
}

export default function AdsMan() {
	const [prop, setProp] = useState(initState)
	const [show, setShow] = useState(false)
	const handleChange = e => {
		setProp({ ...prop, [e.target.name]: e.target.value })
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
						name="img_url"
						value={prop.img_url}
						labelText="Image URL for Ad"
						handleChange={handleChange}
					/>
					<FormText
						type="text"
						name="ad_url"
						value={prop.ad_url}
						labelText="Target URL for Ad"
						handleChange={handleChange}
					/>
					<FormSelect
						name="size"
						labelText="Ad size"
						options={["rectX", "rectY", "square"]}
					/>
					<FormText
						type="text"
						name="category"
						value={prop.category}
						labelText="Priority"
						handleChange={handleChange}
					/>
					<FormText
						type="number"
						name="priority"
						value={prop.priority}
						labelText="Priority"
						handleChange={handleChange}
					/>
					<button className="bg-darkblue text-white">Save</button>
				</Popup>
			)}
		</div>
	)
}
