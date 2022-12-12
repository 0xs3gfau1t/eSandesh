import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useParams } from "react-router-dom"
import { MdCenterFocusStrong } from "react-icons/md"

import { SocialShare, SqAds } from "../../components/common"
import { getSingleNews, getNewsAudio } from "../../redux/actions/publicNews"
import { setFocus } from "../../redux/reducers/misc"
import Comments from "../../components/Comments";



const SingleNews = () => {
	const params = useParams()
	const news = useSelector(state => state.news.singleNews)
	const audio = useSelector(state => state.news.audio)
	const focus = useSelector(state => state.misc.focus)
	const dispatch = useDispatch()

	
	useEffect(() => {
		dispatch(getSingleNews(params))
	}, [])




	return (
		<div className="flex justify-between container gap-4">
			<div className="news-content ml-4 mb-10 w-full">
				<div className="flex">
					<h3
						className={`font-bold px-2 ${
							!focus ? "text-green-600" : "text-red"
						}`}
					>
						{focus ? "Exit" : "Enter"} Focus Mode
					</h3>
					<MdCenterFocusStrong
						className="text-2xl cursor-pointer"
						onClick={e => dispatch(setFocus())}
					/>
				</div>
				<h1 className="text-xl m-4 font-bold">
					{news ? news.title : ""}
				</h1>
				<div className="my-4 w-min mx-auto">
					{audio ? (
						<audio
							controls
							id="audioPlayer"
							className="bg-gray-100 rounded-md"
						>
							<source
								src={news ? `data:audio;base64,${audio}` : "#"}
								type="audio/mpeg"
								className=" bg-blue"
							/>
							Your browser does not support the audio element.
						</audio>
					) : (
						<h1 className="w-max">Loading news audio...</h1>
					)}
				</div>
				<SocialShare
					title={news ? news.title : "eSandesh, Khabat Naya Yug ko"}
				/>
				<div
					dangerouslySetInnerHTML={{
						__html: news ? news.content : "Fetching",
					}}
					// className="flex items-center justify-center w-full"
				/>
				<Comments articleId="6395e60c4de537fe44ee7713"/>
				{/* font-bold text-2xl leading-loose */}
			</div>
			{/* right column */}
			<div className="hidden sm:block px-4">
				{/* ads go here */}
				<SqAds />
				<SqAds />
			</div>
		</div>
	)
}

export default SingleNews
