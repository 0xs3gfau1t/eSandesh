import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useParams } from "react-router-dom"

import { ArticlePreviewMd } from "../../components/common"
import HeroSection from "./HeroSection"
import { listNewsCat } from "../../redux/actions/publicNews"

export default function Content() {
	const list = useSelector(state => state.news.newsListCat)
	const [page, setPage] = useState(0)
	const { cat } = useParams()
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(listNewsCat({ page: page, cat: cat.toUpperCase() }))
	}, [page])

	return (
		<div className="flex flex-col w-11/12 mx-auto px-4">
			<HeroSection cat={cat} data={list ? list[0] : []} />
			<div className="flex gap-4">
				{/* articles */}
				<div className="">
					<ArticlePreviewMd
						title={
							"सुकुम्बासी समस्यामा सधैं राजनीति, समाधानमा बेवास्ता"
						}
						summary={
							"२१ मंसिर, काठमाडौ । ‘के-के न बहादुरी ! शत्रु देशसँगको लडाइँजस्तो भाषाशैली, तरिका ।..."
						}
						imgUrl={
							"https://warnaturbo.b-cdn.net/tutorial/wp-content/uploads/2020/07/01-Add-Change-Picture-in-Image-Placeholder-in-PowerPoint-Template-WarnaSlides.com_.jpg"
						}
						articleUrl={""}
					/>
					<ArticlePreviewMd
						title={
							"नेप्सेमा दोहोरो अंकको गिरावट, डेढ अर्ब माथिको कारोबार"
						}
						summary={
							"२१ मंसिर, काठमाडौं । सेयर बजार परिसूचमा दोहोरो अंकको गिरावट भएको छ । ..."
						}
						imgUrl={
							"https://warnaturbo.b-cdn.net/tutorial/wp-content/uploads/2020/07/01-Add-Change-Picture-in-Image-Placeholder-in-PowerPoint-Template-WarnaSlides.com_.jpg"
						}
						articleUrl={""}
					/>
				</div>
				{/* ads */}
				<div className="my-4 hidden lg:block">
					<a
						href={
							"https://media.tenor.com/IRcIGzwz7IQAAAAC/money-wallet.gif"
						}
						target="_blank"
					>
						<div className=" h-64 bg-darkblue w-52 text-white flex justify-center items-center ">
							Click here for $100
						</div>
					</a>
				</div>
			</div>
		</div>
	)
}
