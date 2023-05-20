import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { AiOutlineCaretRight, AiOutlineCaretLeft } from 'react-icons/ai'
import axios from 'axios'

import { ArticlePreviewMd, SqAds } from '../../components/common'
import HeroSection from './HeroSection'
import { listByAuthor } from '../../redux/actions/publicNews'
import { setFocus } from '../../redux/reducers/misc'
import { getCatMap } from '../../utils/categoryMap'
import { BsFillBellFill, BsFillBellSlashFill } from 'react-icons/bs'
import { setAlert } from '../../redux/actions/misc'
import { useAxiosError } from '../../utils/useAxiosError'

export default function Content({ author }) {
    const [page, setPage] = useState(0)
    const list = useSelector(state => state.news.author)
    const [userInfo, setUserInfo] = useState({
        name: '',
        image: '',
        subscribed: false,
    })
    let [cats, setCats] = useState([])
    const { dispatch, onError } = useAxiosError()

    useEffect(() => {
        dispatch(
            listByAuthor({
                id: author,
                page: page,
            })
        )
    }, [page, author])

    useEffect(() => {
        setPage(0)
        dispatch(setFocus(false))
        axios
            .get(`/api/user?id=${author}`)
            .then(res => {
                setUserInfo(res.data.userInfo)
            })
            .catch(err => console.log(err))
    }, [author])

    useEffect(() => {
        let catUp = []
        if (list && list.length > 0) {
            for (let i = 0; i < list.length; i++) {
                catUp = [...catUp, ...list[i].category]
                if (i + 1 > list.length - 1) break
            }
        }
        catUp = [...new Set(catUp)]
        setCats(catUp)
    }, [list])

    const subscribe = async () => {
        let config = {
            method: userInfo.subscribed ? 'delete' : 'post',
            url: '/api/subscriptions',
            data: { id: userInfo._id },
        }

        await axios(config)
            .then(res => {
                dispatch(
                    setAlert(
                        `Author ${config.method == 'post'
                            ? 'Subscribed'
                            : 'Unsubscribed'
                        }!`,
                        'success'
                    )
                )
                setUserInfo(o => ({
                    ...o,
                    subscribed: config.method == 'post',
                }))
            })
            .catch(onError)
    }

    return (
        <div className="flex flex-col w-full mx-auto px-4 gap-2">
            <div className="flex gap-4 place-items-center">
                <img
                    className="w-20 h-20 rounded-full"
                    src={
                        userInfo.image ||
                        'https://cdn-icons-png.flaticon.com/512/149/149071.png?w=740&t=st=1684569916~exp=1684570516~hmac=70daac1534536a3d34c807352aa38270b496f271c4c17c29aee83b007c0ac13b'
                    }
                />
                <div className="flex flex-col gap-2">
                    <div>
                        <span className="text-xl font-bold mt-4">
                            {userInfo.name}
                        </span>
                        <div
                            onClick={subscribe}
                            className={`${userInfo.subscribed
                                    ? 'text-gray-600'
                                    : 'text-rose-700'
                                } text-2xl my-auto cursor-pointer`}
                            title={
                                userInfo.subscribed
                                    ? 'Unsubscribe'
                                    : 'Subscribe'
                            }
                        >
                            {userInfo.subscribed ? (
                                <BsFillBellSlashFill />
                            ) : (
                                <BsFillBellFill />
                            )}
                        </div>
                    </div>
                    लेखकका शिर्ष बर्गहरु
                    <div className="flex flex-wrap gap-2 max-w-lg">
                        {cats.map((cat, idx) => {
                            return (
                                <span
                                    key={idx}
                                    className="text-white bg-green-700 px-2 py-1 rounded-md"
                                >
                                    {getCatMap(cat)}
                                </span>
                            )
                        })}
                    </div>
                </div>
            </div>
            <HeroSection cat={'Author'} data={list ? list[0] : []} />
            <div className="flex gap-4">
                {/* articles */}
                <div className="w-full">
                    {list &&
                        Object.keys(list.slice(1)).map(key => {
                            const data = list[parseInt(key) + 1]
                            return (
                                <ArticlePreviewMd
                                    key={key}
                                    title={data.title}
                                    imgUrl={data.img ? data.img : ''}
                                    articleUrl={`/news/${data.year}/${data.month}/${data.slug}`}
                                />
                            )
                        })}
                </div>
            </div>
            <div className="flex w-fit mx-auto">
                <AiOutlineCaretLeft
                    className="cursor-pointer hover:text-rose-700 text-3xl"
                    onClick={e => setPage(page == 0 ? 0 : page - 1)}
                />
                <span className="py-1 px-2 bg-cyan-900 place-items-center rounded text-white">
                    Page {page + 1}
                </span>
                <AiOutlineCaretRight
                    className="cursor-pointer hover:text-rose-700 text-3xl"
                    onClick={e => setPage(page + 1)}
                />
            </div>
        </div>
    )
}
