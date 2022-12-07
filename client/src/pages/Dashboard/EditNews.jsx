import { useState } from "react"
import { useDispatch } from "react-redux"
import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"

import EditorToolbar, { modules, formats } from "./EditorTools"
import { FormText } from "../../components/common"
import { addNews } from "../../redux/actions/dashNews"

const initState = {
	title: "",
	category: [],
	tags: [],
}

const EditNews = () => {
	const [news, setNews] = useState("")
	const [property, setProp] = useState(initState)

	const dispatch = useDispatch()

	const handleChange = e => {
		setProp({ ...property, [e.target.name]: e.target.value })
	}

	const onPublish = e => {
		dispatch(addNews({ content: news, ...property }))
	}
	return (
		<div className="ml-4 w-4/5 flex gap-4">
			<div>
				<FormText
					type="text"
					name="title"
					value={property.title}
					labelText="Title"
					handleChange={handleChange}
				/>
				<EditorToolbar />
				<ReactQuill
					theme="snow"
					value={news}
					onChange={setNews}
					placeholder={"What's hot?..."}
					modules={modules}
					formats={formats}
				/>
			</div>
			<div>
				<button className="" onClick={onPublish}>
					Publish
				</button>
			</div>
		</div>
	)
}

export default EditNews
