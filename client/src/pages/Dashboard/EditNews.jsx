import { useState } from "react"
import ReactQuill from "react-quill"

import EditorToolbar, { modules, formats } from "./EditorTools"
import "react-quill/dist/quill.snow.css"

const EditNews = () => {
	const [news, setNews] = useState("")
	return (
		<div className="ml-4">
			<h1>Edit News</h1>
			<EditorToolbar />
			<ReactQuill
				theme="snow"
				value={news}
				onChange={setNews}
				placeholder={"Write something awesome..."}
				modules={modules}
				formats={formats}
			/>
		</div>
	)
}

export default EditNews
