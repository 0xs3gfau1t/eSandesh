import { useState } from "react"
import { Link } from "react-router-dom"
import { BsFillPlusSquareFill } from "react-icons/bs"
import { FormText } from "../../components/common"
import { Popup } from "../../components/common"

const initState = {
	show: false,
	name: "",
	size: "",
	priority: 10,
	img_url: "",
	ad_url: "",
}

export default function AdsMan() {
	const [prop, setProp] = useState(initState)
	const [show, setShow] = useState(false)
	const handleChange = e => {
		setProp({ ...property, [e.target.name]: e.target.value })
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
						value={prop.name}
						labelText="Image URL for Ad"
						handleChange={handleChange}
					/>
				</Popup>
			)}
		</div>
	)
}
