import React from "react"

import { ArticlePreviewSm } from "../../components/common"

export default function SideScrollNewsSection({ category, data }) {
	// if category="hot" or "home" show top news
	// if category="politics" show news from politics category
	return (
		<div className="flex items-start justify-between gap-4 overflow-x-scroll">
			{data &&
				data.map((news, index) => {
					return (
						<ArticlePreviewSm
							key={index}
							title={news.title}
							articleUrl={`/news/${news.year}/${news.month}/${news.slug}`}
							imgUrl={
								news.image
									? news.image
									: "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png"
							}
						/>
					)
				})}
		</div>
	)
}
