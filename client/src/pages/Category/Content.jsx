import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useParams } from "react-router-dom"

import { ArticlePreviewMd, SqAds } from "../../components/common"
import HeroSection from "./HeroSection"
import { listNewsCat } from "../../redux/actions/publicNews"
import { setFocus } from "../../redux/reducers/misc"

export default function Content() {
	const [page, setPage] = useState(0)
	const { cat } = useParams()
	const list = useSelector(state => state.news[cat])
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(listNewsCat({ page: page, cat: cat.toUpperCase() }))
	}, [page, cat])

	useEffect(() => {
		dispatch(setFocus(false))
	})

	return (
		<div className="flex flex-col w-11/12 mx-auto px-4">
			<HeroSection cat={cat} data={list ? list[0] : []} />
			<div className="flex gap-4">
				{/* articles */}
				<div className="">
					{list &&
						Object.keys(list.slice(1)).map(key => {
							const div = document.createElement("div")
							div.innerHTML = list[parseInt(key) + 1].content
							const img = div.querySelector("img")
							const data = list[parseInt(key) + 1]
							return (
								<ArticlePreviewMd
									key={key}
									title={data.title}
									summary={"Tuchha description here..."}
									imgUrl={img ? img.src : ""}
									articleUrl={`/news/${data.year}/${data.month}/${data.slug}`}
								/>
							)
						})}
				</div>
				{/* ads */}
				<SqAds />
			</div>
		</div>
	)
}
