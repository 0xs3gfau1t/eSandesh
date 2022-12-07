import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useParams } from "react-router-dom"

import { getSingleNews } from "../../redux/actions/publicNews"

const SingleNews = () => {
	const { id } = useParams()
	const news = useSelector(state => state.publicNews.singleNews)
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(getSingleNews(id))
	}, [id])
	return (
		<div className="m-4 w-1/2 mx-auto">
			<h1 className="text-xl m-4 font-bold">{news ? news.title : ""}</h1>
			<div
				dangerouslySetInnerHTML={{
					__html: news ? news.content : "Fetching",
				}}
				className=""
			/>
		</div>
	)
}

export default SingleNews
