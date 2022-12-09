import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useParams } from "react-router-dom"

import { SqAds } from "../../components/common"
import { getSingleNews } from "../../redux/actions/publicNews"

const SingleNews = () => {
	const params = useParams()
	const news = useSelector(state => state.news.singleNews)
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(getSingleNews(params))
	}, [])
	return (
		<div className="flex justify-between container gap-4">
			<div className="news-content ml-4 mb-4">
				<h1 className="text-xl m-4 font-bold">
					{news ? news.title : ""}
				</h1>
				<div
					dangerouslySetInnerHTML={{
						__html: news ? news.content : "Fetching",
					}}
					className=""
				/>
			</div>
			<div className="hidden sm:block px-4">
				{/* ads go here */}
				<SqAds />
				<SqAds />
			</div>
		</div>
	)
}

export default SingleNews
