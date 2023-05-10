import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import HomeHero from './HomeHero'
import RecentNews from './RecentNews'
import SideScrollNewsSection from './SideScrollNewsSection'
import { RectAds, SeeAllBtn } from '../../components/common'
import EachCategoryPreview from './EachCategoryPreview'
import { getRecentNews } from '../../redux/actions/publicNews'
import { setFocus } from '../../redux/reducers/misc'

const Landing = () => {
    const recent = useSelector(state => state.news.recentNews)
    const hot = useSelector(state => state.news.hot)
    const adsX = useSelector(state => state.ads.rectX)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getRecentNews(0))
        dispatch(setFocus(false))
    }, [])

    return (
        <div>
            <div className="w-full">
                <RectAds ad={adsX ? adsX[0] : false} />
                {recent?.length && (
                    <div className="flex gap-2 mb-10">
                        <div className="w-full sm:w-3/5">
                            <HomeHero data={recent[0]} />
                        </div>
                        <div className="w-2/5 sm:block hidden bg-white shadow-sm p-4 rounded-xl">
                            <h2 className="text-2xl flex items-baseline justify-between font-semibold leading-loose">
                                ताजा खबर <SeeAllBtn url={'category/recent'} />{' '}
                                {/*recent hunxa ki "hot" hunxa, hot ta tala pani xa*/}
                            </h2>
                            <RecentNews data={recent.slice(1)} />
                        </div>
                    </div>
                )}
                <h1 className="flex items-baseline justify-between font-semibold text-2xl">
                    अन्य चर्चित विषयहरू <SeeAllBtn url={`/category/hot`} />
                </h1>
                <SideScrollNewsSection category={'hot'} data={hot} />
                <hr className=" w-11/12 my-10 border-neutral-300" />
                <RectAds ad={adsX ? adsX[1] : false} />

                <div className="mb-10 pb-4">
                    {/* middle scrolling news under the hero section */}
                    <EachCategoryPreview category="story" />
                    <RectAds ad={adsX ? adsX[2] : false} />
                </div>
                <hr className=" w-11/12 my-10 border-neutral-300" />

                <div className="mb-10 pb-4">
                    {/* middle scrolling news under the hero section */}
                    <EachCategoryPreview category="politics" />
                    <RectAds ad={adsX ? adsX[3] : false} />
                    <EachCategoryPreview category="sports" />
                    <RectAds ad={adsX[5] ? adsX[5] : false} />
                </div>
                {/* other category previews go here */}
                {/* I think other category previews should be placed here ok */}
                {/* end of categories preview / middle scrolling section ends here */}
            </div>
        </div>
    )
}

export default Landing
