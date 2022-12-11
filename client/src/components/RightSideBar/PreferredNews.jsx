import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"

import { ArticlePreviewSm } from "../common"

function PreferredNews() {
	const prefNews = useSelector(state => state.news.prefNews)

	return (
		<div className="flex flex-col flex-wrap bg-white rounded-lg px-4 shadow-sm">
			<ul>
				{prefNews &&
					prefNews.map((news, index) => {
						return (
							<li key={index}>
								<ArticlePreviewSm
									title={news.title}
									articleUrl={`/news/${news.year}/${news.month}/${news.slug}`}
								/>
							</li>
						)
					})}
			</ul>
		</div>
	)
}

export default PreferredNews
