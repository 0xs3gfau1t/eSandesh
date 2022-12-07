import { useState } from "react"
import ReactQuill from "react-quill"

import EditorToolbar, { modules, formats } from "./EditorTools"
import "react-quill/dist/quill.snow.css"

const initState = {
	title: "",
	category: [],
	tags: [],
}

const EditNews = () => {
	const [news, setNews] = useState("")
	const [property, setProp] = useState()

	return (
		<div className="ml-4">
			<h1>Edit News</h1>
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
	)
}

export default EditNews
