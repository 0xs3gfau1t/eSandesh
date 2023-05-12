import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { AiOutlineCaretRight, AiOutlineCaretLeft } from 'react-icons/ai'

import { ArticlePreviewMd, SqAds } from '../../components/common'
import HeroSection from './HeroSection'
import { listNewsCat } from '../../redux/actions/publicNews'
import { setFocus } from '../../redux/reducers/misc'

export default function Content() {
    const [page, setPage] = useState(0)
    const { cat } = useParams()
    const list = useSelector(state => state.news[cat])
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(
            listNewsCat({
                page: page,
                cat: cat == 'hot' ? 'hot' : cat.toUpperCase(),
            })
        )
    }, [page, cat])

    useEffect(() => {
        dispatch(setFocus(false))
    })

    return (
        <div className="flex flex-col w-full mx-auto px-4">
            <HeroSection cat={cat} data={list ? list[0] : []} />
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
