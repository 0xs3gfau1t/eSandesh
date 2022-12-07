import { useState } from "react"
import { useDispatch } from "react-redux"
import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"

import EditorToolbar, { modules, formats } from "./EditorTools"
import { FormText } from "../../components/common"
import { addNews } from "../../redux/actions/dashNews"

const initState = {
	title: "",
	category: "",
	tags: "",
}

const EditNews = () => {
	const [news, setNews] = useState("")
	const [property, setProp] = useState(initState)

	const dispatch = useDispatch()

	const handleChange = e => {
		setProp({ ...property, [e.target.name]: e.target.value })
	}

	const onPublish = e => {
		let tags = property.tags.split(",").map(tag => tag.trim())
		let category = property.category
			.split(",")
			.map(category => category.trim())
		dispatch(addNews({ content: news, tags: tags, category: category }))
	}
	return (
		<div className="ml-4 flex gap-8">
			<div className="">
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
			<div className="mt-4">
				<button
					onClick={onPublish}
					className="bg-darkblue text-white mb-2"
				>
					Publish
				</button>
				<FormText
					type="text"
					name="category"
					value={property.category}
					labelText="Categories"
					handleChange={handleChange}
				/>
				<FormText
					type="text"
					name="tags"
					value={property.tags}
					labelText="Tags"
					handleChange={handleChange}
				/>
			</div>
		</div>
	)
}

export default EditNews