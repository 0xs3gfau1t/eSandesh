import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"

import { ArticlePreviewSm } from "../common"
import { listNewsCat } from "../../redux/actions/publicNews"

function PreferredNews() {
	const prefNews = useSelector(state => state.news.preference)
	const dispatch = useDispatch()
	useEffect(() => {
		dispatch(listNewsCat({ page: 0, cat: "preference", items: 3 }))
	}, [])
	return (
		<div className="flex flex-col flex-wrap bg-white rounded-lg px-2 shadow-sm">
			<ul>
				{prefNews &&
					prefNews.map((news, index) => {
						return (
							<li key={index}>
								<ArticlePreviewSm
									title={news.title}
									articleUrl={`/news/${news.year}/${news.month}/${news.slug}`}
									imgUrl={
										news?.img
											? news.img
											: "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png"
									}
								/>
							</li>
						)
					})}
			</ul>
		</div>
	)
}

export default PreferredNews
