import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"

import HomeHero from "./HomeHero"
import RecentNews from "./RecentNews"
import SideScrollNewsSection from "./SideScrollNewsSection"
import { RectAds } from "../../components/common"
import EachCategoryPreview from "./EachCategoryPreview"
import { getHotNews } from "../../redux/actions/publicNews"

const Landing = () => {
	const hot = useSelector(state => state.news.hotNews)
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(getHotNews(0))
	}, [])

  return (
    <div>
      <div className="w-full px-4">
        {hot && (
          <div className="flex gap-6">
            <div className="w-full sm:w-2/3">
              <HomeHero data={hot[0]} />
            </div>
            <div className="w-1/3 sm:block hidden">
              <h2 className=" text-2xl font-semibold leading-loose">
                Recent News
              </h2>
              <RecentNews data={hot.slice(1)} />
            </div>
          </div>
        )}
        <h1 className="font-semibold text-2xl">Hottest Topics</h1>
        <SideScrollNewsSection category={"hot"} />
        <RectAds
          type={
            "ma X category sita relevent ad ho, Life Insurance garnuhos Y life insurance"
          }
        />
        <div className="mb-10 pb-4">
          {/* middle scrolling news under the hero section */}
          <EachCategoryPreview category="health" />
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
  );
};

export default Landing
