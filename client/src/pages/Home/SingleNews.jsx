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
		console.log("News", news)
	}, [id])
	return (
		<div>
			<h1>{news ? news.title : ""}</h1>
			<div
				dangerouslySetInnerHTML={{
					__html: news ? news.content : "Fetching",
				}}
			/>
		</div>
	)
}

export default SingleNews
