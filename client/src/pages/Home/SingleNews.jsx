import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { BiBookReader } from 'react-icons/bi'
import axios from 'axios'

import {
    SocialShare,
    SqAds,
    RectXAd,
    RectYAd,
    Popup,
    LikeSaveShare,
} from '../../components/common'
import { getSingleNews } from '../../redux/actions/publicNews'
import { setFocus } from '../../redux/reducers/misc'
import Comments from '../../components/Comments'
import { getRelAds } from '../../redux/actions/ads'
import { delSingleNews } from '../../redux/reducers/news'

const SingleNews = () => {
    const params = useParams()
    const news = useSelector(state => state.news.singleNews)
    const focus = useSelector(state => state.misc.focus)
    const adsX = useSelector(state => state.ads.rectX)
    const adsY = useSelector(state => state.ads.rectY)

    const [showPopup, setPopup] = useState(true)
    const [showSummary, setSummary] = useState(false)
    const [summary, upSummary] = useState('Loading..')
    const [fontSize, setFontSize] = useState(1)
    const dispatch = useDispatch()

    const getSummary = async () => {
        const sum = await axios
            .get(`/api/article/summary?_id=${news._id}`)
            .then(res => {
                return res.data.summary
            })

        upSummary(sum)
        setSummary(true)
    }
    const dateOpt = {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    }

    useEffect(() => {
        if (news?.slug != params.slug) {
            dispatch(delSingleNews())
            dispatch(getSingleNews({ params: params, noAudio: false }))
            dispatch(getRelAds({ limit: 4, type: 'rectY' }))
        }
    }, [params])
    return (
        <div className="flex justify-between container gap-2">
            {news && news.category.includes('STORY') && showPopup && (
                <Popup setShow={setPopup} title={'Ad'}>
                    <div className="flex flex-row w-full">
                        <SqAds />
                        <button onClick={e => setPopup(false)}>X</button>
                    </div>
                </Popup>
            )}
            {showSummary && (
                <Popup
                    setShow={setSummary}
                    title={`सारांश: ${news?.title}`}
                    width={'w-2/4'}
                >
                    {summary}
                </Popup>
            )}
            <div className="news-content ml-2 mb-10">
                {focus && (
                    <RectXAd ad={adsX ? (adsX[0] ? adsX[0] : false) : false} />
                )}

                <div className="flex">
                    <h3
                        className={`font-bold px-2 ${
                            !focus ? 'text-green-600' : 'text-red'
                        }`}
                    >
                        {focus ? 'Exit' : 'Enter'} Focus Mode
                    </h3>
                    <BiBookReader
                        className="text-2xl my-1 cursor-pointer"
                        onClick={e => dispatch(setFocus(!focus))}
                    />

                    {focus && (
                        <div className="flex gap-2">
                            <span className="text-sm ml-4 py-2">
                                Font Size:
                            </span>
                            <input
                                type="range"
                                min="1"
                                max="5"
                                value={fontSize}
                                className="bg-transparent w-20 "
                                onChange={e => setFontSize(e.target.value)}
                            />
                        </div>
                    )}
                </div>

                <div className="flex flex-col gap-0">
                    <h1 className="text-xl mt-4 font-bold">
                        {news ? news.title : 'Loading....'}
                    </h1>
                    <h2 className="ml-4">
                        {news
                            ? new Date(news.publishedAt).toLocaleDateString(
                                  'en-US',
                                  dateOpt
                              ) + ' | '
                            : ''}
                        {news ? news.author.name : ''}
                    </h2>
                    <SocialShare
                        title={
                            news ? news.title : 'eSandesh, Khabar Naya Yug ko'
                        }
                        id={news ? news._id : ''}
                    />
                </div>
                <div className="my-4  mx-auto flex justify-center gap-8">
                    {!news?.category.includes('STORY') && (
                        <>
                            {news ? (
                                <audio
                                    controls
                                    id="audioPlayer"
                                    src={news.audio}
                                >
                                    Your browser does not support the audio
                                    element.
                                </audio>
                            ) : (
                                <h1 className="w-max">Loading news audio...</h1>
                            )}
                        </>
                    )}
                    <span
                        onClick={getSummary}
                        className="px-2 py-1 h-min bg-green-700 text-white rounded cursor-pointer"
                    >
                        सारांश पढ्नुहोस्
                    </span>
                </div>
                <div
                    className={`text-${fontSize}xl mt-4`}
                    dangerouslySetInnerHTML={{
                        __html: news
                            ? news.content
                            : 'Fetching news content...',
                    }}
                />
                {/* {focus && <RectXAd />} */}
                <RectXAd ad={adsX ? (adsX[3] ? adsX[3] : false) : false} />
                <div className="w-full flex justify-end">
                    <LikeSaveShare likes={'१.२'} id={news ? news._id : ''} />
                </div>

                <Comments articleId={news?._id} />
            </div>
            {/* right column */}
            {!focus && (
                <div className="hidden xl:block pl-2">
                    {/* ads go here */}
                    <RectYAd
                        ad={adsY ? (adsY[0] ? adsY[0] : false) : false}
                        type={'y'}
                    />
                </div>
            )}
        </div>
    )
}

export default SingleNews
