import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useParams } from "react-router-dom"
// import { MdCenterFocusStrong } from "react-icons/md"
import { BiBookReader } from "react-icons/bi"

import {
	SocialShare,
	SqAds,
	RectAds,
	Popup,
	LikeSaveShare,
} from "../../components/common"
import { getSingleNews } from "../../redux/actions/publicNews"
import { setFocus } from "../../redux/reducers/misc"

const SingleNews = () => {
	const params = useParams()
	const news = useSelector((state) => state.news.singleNews)
	const audio = useSelector((state) => state.news.audio)
	const focus = useSelector((state) => state.misc.focus)
	const [show, setShow] = useState(true)

	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(getSingleNews({ params: params, noAudio: false }))
	}, [params])
	return (
		<div className="flex justify-between container gap-4">
			{news && news.category[0] == "STORY" && show && (
				<Popup setShow={setShow} title={"Ad"}>
					<div className="flex flex-row w-full">
						<SqAds />
						<button onClick={(e) => setShow(false)}>X</button>
					</div>
				</Popup>
			)}
			<div className="news-content ml-4 mb-10 w-full">
				{focus && <RectAds />}

				<div className="flex">
					<h3
						className={`font-bold px-2 ${
							!focus ? "text-green-600" : "text-red"
						}`}
					>
						{focus ? "Exit" : "Enter"} Focus Mode
					</h3>
					<BiBookReader
						className="text-2xl my-1 cursor-pointer"
						onClick={(e) => dispatch(setFocus(!focus))}
					/>
				</div>
				<h1 className="text-xl m-4 font-bold">{news ? news.title : ""}</h1>
				<div className="my-4 w-min mx-auto">
					{audio ? (
						<audio controls id="audioPlayer" className="bg-gray-100 rounded-md">
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
				{/* <SocialShare
					title={news ? news.title : "eSandesh, Khabar Naya Yug ko"}
					id={news ? news._id : ""}
				/> */}
				<div
					dangerouslySetInnerHTML={{
						__html: news ? news.content : "Fetching",
					}}
					// className="flex items-center justify-center w-full"
				/>
				{/* {focus && <RectAds />} */}
				<RectAds />
				<div className="w-full flex justify-end">
					<LikeSaveShare likes={"१.२"} />
				</div>
				<SocialShare
					title={news ? news.title : "eSandesh, Khabar Naya Yug ko"}
					id={news ? news._id : ""}
				/>
			</div>
			{/* right column */}
			{!focus && (
				<div className="hidden sm:block px-4">
					{/* ads go here */}
					<SqAds />
					<SqAds />
				</div>
			)}
		</div>
	)
}

export default SingleNews
