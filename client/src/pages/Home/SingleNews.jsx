import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { BiBookReader } from 'react-icons/bi'
import { RxCross2 } from 'react-icons/rx'
import { BsFillBellFill, BsFillBellSlashFill } from 'react-icons/bs'
import axios from 'axios'

import {
    SocialShare,
    SqAds,
    RectXAd,
    RectYAd,
    Popup,
    LikeSaveShare,
    SeeAllBtn,
} from '../../components/common'
import SideScrollNewsSection from './SideScrollNewsSection'
import { getSingleNews } from '../../redux/actions/publicNews'
import { setFocus } from '../../redux/reducers/misc'
import Comments from '../../components/Comments'
import { delSingleNews, subscribeAuthor } from '../../redux/reducers/news'
import { setAlert } from '../../redux/actions/misc'

const SingleNews = () => {
    const params = useParams()
    const news = useSelector(state => state.news.singleNews)
    const similar = useSelector(
        state => state.news[news?.category[0]?.toLowerCase()]
    )
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
        if (!sum) upSummary('छोटो समाचारको लागि सारांश उपलब्ध छैन।')
        else upSummary(sum)
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
            setPopup(true)
        }
    }, [params])

    const subscribe = async () => {
        let config = {
            method: news?.author.subscribed ? 'delete' : 'post',
            url: '/api/subscriptions',
            data: { id: news?.author._id },
        }

        await axios(config)
            .then(res => {
                dispatch(
                    setAlert(
                        `Author ${
                            config.method == 'post'
                                ? 'Subscribed'
                                : 'Unsubscribed'
                        }!`,
                        'success'
                    )
                )
                dispatch(subscribeAuthor())
            })
            .catch(err => {
                console.log(err)
                dispatch(setAlert('Action failed!', 'danger'))
            })
    }

    return (
        <div className="flex justify-between container gap-2">
            {news && news.popup && showPopup && (
                <div className="fixed inset-0 z-10">
                    <div className="fixed inset-0 w-full h-full bg-black opacity-40" />
                    <div
                        className={`flex items-center min-h-screen px-4 py-8  mx-auto`}
                    >
                        <div className="flex px-4 mx-auto">
                            <div className="relative mx-auto  rounded-md drop-shadow-3xl max-h-[95vh] overflow-auto">
                                <div className="my-2 text-center sm:mx-4 sm:text-left">
                                    <RxCross2
                                        onClick={e => setPopup(false)}
                                        className="cursor-pointer absolute stroke-[0.8px] text-red z-10 text-2xl font-extrabold"
                                    />

                                    <SqAds ad={news?.popup} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
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
                    <div className="flex gap-4">
                        <h2 className="ml-4">
                            {news
                                ? new Date(news.publishedAt).toLocaleDateString(
                                      'en-US',
                                      dateOpt
                                  ) + ' | '
                                : ''}
                            <Link
                                to={`/author/${news?.author?._id}`}
                                className="hover:text-rose-700 "
                            >
                                {news ? news.author.name : ''}
                            </Link>
                        </h2>
                        <div
                            onClick={subscribe}
                            className={`${
                                news?.author?.subscribed
                                    ? 'text-gray-600'
                                    : 'text-rose-700'
                            } text-2xl my-auto cursor-pointer`}
                            title={
                                news?.author?.subscribed
                                    ? 'Unsubscribe'
                                    : 'Subscribe'
                            }
                        >
                            {news?.author?.subscribed ? (
                                <BsFillBellSlashFill />
                            ) : (
                                <BsFillBellFill />
                            )}
                        </div>
                    </div>
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
                    className={`text-${fontSize}xl mt-4 content`}
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
                <h1 className="flex items-baseline justify-between font-semibold text-2xl">
                    अन्य समान वर्गका विषयहरू लेखहरू{' '}
                    <SeeAllBtn
                        url={`/category/${news?.category[0]?.toLowerCase()}`}
                    />
                </h1>
                <SideScrollNewsSection
                    category={news?.category[0]}
                    data={similar}
                />
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
