import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"

import HomeHero from "./HomeHero"
import RecentNews from "./RecentNews"
import SideScrollNewsSection from "./SideScrollNewsSection"
import { RectAds, SeeAllBtn } from "../../components/common"
import EachCategoryPreview from "./EachCategoryPreview"
import { getRecentNews } from "../../redux/actions/publicNews"
import { setFocus } from "../../redux/reducers/misc"

const Landing = () => {
	const recent = useSelector(state => state.news.recentNews)
	const hot = useSelector(state => state.news.hot)

	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(getRecentNews(0))
		dispatch(setFocus(false))
	}, [])

	return (
		<div>
			<div className="w-full">
				{recent && (
					<div className="flex gap-6">
						<div className="w-full sm:w-2/3">
							<HomeHero data={recent[0]} />
						</div>
						<div className="w-1/3 sm:block hidden">
							<h2 className="text-2xl flex items-baseline justify-between font-semibold leading-loose">
								ताजा खबर <SeeAllBtn url={"category/recent"} />{" "}
								{/*recent hunxa ki "hot" hunxa, hot ta tala pani xa*/}
							</h2>
							<RecentNews data={recent.slice(1)} />
						</div>
					</div>
				)}
				<h1 className="flex items-baseline justify-between font-semibold text-2xl">
					Hottest Topics <SeeAllBtn url={`/category/hot`} />
				</h1>
				<SideScrollNewsSection category={"hot"} data={hot} />
				<RectAds
					type={
						"ma X category sita relevent ad ho, Life Insurance garnuhos Y life insurance"
					}
				/>
				<div className="mb-10 pb-4">
					{/* middle scrolling news under the hero section */}
					<EachCategoryPreview category="story" />
					<RectAds
						type={
							"ma X category sita relevent ad ho, Life Insurance garnuhos Y life insurance"
						}
					/>
				</div>
				<div className="mb-10 pb-4">
					{/* middle scrolling news under the hero section */}
					<EachCategoryPreview category="technology" />
					<RectAds
						type={
							"ma X category sita relevent ad ho, Life Insurance garnuhos Y life insurance"
						}
					/>
				</div>
				{/* other category previews go here */}
				{/* I think other category previews should be placed here ok */}
				{/* end of categories preview / middle scrolling section ends here */}
			</div>
		</div>
	)
}

export default Landing
