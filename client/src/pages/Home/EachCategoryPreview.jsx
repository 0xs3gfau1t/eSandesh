import { useEffect } from "react"
import { Link } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"

import { LikeSaveShare, SeeAllBtn } from "../../components/common"
import SideNewsList from "./SideNewsList"
import SideScrollNewsSection from "./SideScrollNewsSection"
import { listNewsCat } from "../../redux/actions/publicNews"

export default function EachCategoryPreview({ category }) {
	const khabar = useSelector((state) => state.news[category])
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(listNewsCat({ page: 0, cat: category.toUpperCase() }))
	}, [])
	return (
		<>
			{khabar && khabar.length > 0 && (
				<>
					<h1 className="text-4xl font-bold leading-loose">
						{category} मा ट्रेन्डिङ
					</h1>
					<div className="flex mb-10 pb-4 gap-4 ">
						<div className="w-3/5  bg-white shadow-sm p-6 rounded-xl">
							<Link
								to={`/news/${khabar[0].year}/${khabar[0].month}/${khabar[0].slug}`}
							>
								<img
									className="rounded-lg"
									src={
										khabar[0].img
											? khabar[0].img
											: "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png"
									}
								/>
							</Link>
							<div className="flex items-end justify-between">
								<h1 className="text-3xl w-4/5 mt-4 hover:text-red duration-200 ease-in-out">
									<Link
										to={`/news/${khabar[0].year}/${khabar[0].month}/${khabar[0].slug}`}
									>
										{khabar[0].title}
									</Link>
								</h1>
								{/* <div className="flex items-center w-2/5"> */}
								{/* <span className="text-xs text-slate-400 w-1/2">
										2020 March- 12
									</span> */}
								<LikeSaveShare
									// articleId={}
									likes={"100k"}
									className="w-1/5"
								/>
								{/* </div> */}
							</div>
						</div>
						<div className="p-4 w-2/5 bg-white shadow-sm rounded-xl">
							<h2 className="text-2xl font-bold leading-loose">
								{category} मा शीर्ष लेखहरू
							</h2>
							<SideNewsList category={category} data={khabar.slice(1)} />
						</div>
					</div>
					{/* <div>
						<div className="flex items-baseline justify-between">
							<h1 className="font-semibold text-2xl leading-loose">
								More from {category}
							</h1>
							<SeeAllBtn url={`/category/${category}`} />
						</div>
						{/* <SideScrollNewsSection category={"health"} />
					</div> */}
				</>
			)}
		</>
	)
}
