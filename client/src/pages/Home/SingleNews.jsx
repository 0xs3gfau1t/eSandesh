import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { BiBookReader, BiSave } from 'react-icons/bi'

import {
    SocialShare,
    SqAds,
    RectAds,
    Popup,
    LikeSaveShare,
} from '../../components/common'
import { getSingleNews } from '../../redux/actions/publicNews'
import { setFocus } from '../../redux/reducers/misc'
import Comments from '../../components/Comments'

const SingleNews = () => {
    const params = useParams()
    const news = useSelector(state => state.news.singleNews)
    const focus = useSelector(state => state.misc.focus)
    const [show, setShow] = useState(true)
    const [fontSize, setFontSize] = useState(1)
    const dispatch = useDispatch()

    const dateOpt = {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    }

    useEffect(() => {
        if (news?.slug != params.slug)
            dispatch(getSingleNews({ params: params, noAudio: false }))
    }, [params])
    return (
        <div className="flex justify-between container gap-4">
            {news && news.category[0] == 'STORY' && show && (
                <Popup setShow={setShow} title={'Ad'}>
                    <div className="flex flex-row w-full">
                        <SqAds />
                        <button onClick={e => setShow(false)}>X</button>
                    </div>
                </Popup>
            )}
            <div className="news-content ml-4 mb-10 w-full">
                {focus && <RectAds />}

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
                        {news ? news.title : ''}
                    </h1>
                    <h2 className="ml-4">
                        {news
                            ? new Date(news.publishedAt).toLocaleDateString(
                                  'en-US',
                                  dateOpt
                              )
                            : ''}
                        &nbsp;| {news ? news.author.name : ''}
                    </h2>
                    <SocialShare
                        title={
                            news ? news.title : 'eSandesh, Khabar Naya Yug ko'
                        }
                        id={news ? news._id : ''}
                    />
                </div>
                <div className="my-4 w-min mx-auto">
                    {news ? (
                        <audio controls id="audioPlayer" src={news.audio}>
                            Your browser does not support the audio element.
                        </audio>
                    ) : (
                        <h1 className="w-max">Loading news audio...</h1>
                    )}
                </div>
                <div
                    className={`text-${fontSize}xl`}
                    dangerouslySetInnerHTML={{
                        __html: news ? news.content : 'Fetching',
                    }}
                />
                {/* {focus && <RectAds />} */}
                <RectAds />
                <div className="w-full flex justify-end">
                    <LikeSaveShare likes={'१.२'} id={news ? news._id : ''} />
                </div>

                <Comments articleId={news?._id} />
            </div>
            {/* right column */}
            {!focus && (
                <div className="hidden xl:block px-4">
                    {/* ads go here */}
                    <SqAds />
                    <SqAds />
                </div>
            )}
        </div>
    )
}

export default SingleNews
