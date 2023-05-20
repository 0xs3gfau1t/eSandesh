import axios from 'axios'
import { useEffect, useState } from 'react'
import { AiOutlineCalendar, AiOutlineRead, AiOutlineUser } from 'react-icons/ai'
import { Link, useSearchParams } from 'react-router-dom'
import { getRelativeTime } from '../utils/relativeDuration'
import { formatString } from '../utils/formatString'
import { useAxiosError } from '../utils/useAxiosError'

const SearchPage = () => {
    const [params, _setParams] = useSearchParams()

    const [searchResult, setSearchResult] = useState({
        data: [],
        nextCursor: 0,
    })

    const { onError } = useAxiosError()

    const fetchMore = () => {
        if (searchResult.nextCursor == -1) return
        axios
            .get(`/api/article/search?${params.toString()}`, {
                params: { skip: searchResult.nextCursor },
            })
            .then(res =>
                setSearchResult(o => ({
                    data: [...o.data, ...res.data.data],
                    nextCursor: res.data.nextCursor,
                }))
            )
            .catch(onError)
    }

    useEffect(fetchMore, [params])

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold">खोज परिणामहरू </h1>
            {searchResult.data.length > 0 ? (
                <>
                    {searchResult.data.map(s => (
                        <Link
                            to={`/news/${s.year}/${s.month}/${s.slug}`}
                            key={s._id}
                            className="flex flex-row border-b-2 border-solid border-slate-400 shadow-sm hover:shadow-lg p-8 rounded-md mb-4 gap-2"
                        >
                            <img
                                className="w-20 h-20 rounded-sm"
                                src={
                                    s.img ||
                                    'https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png'
                                }
                            />
                            <div className="flex flex-col flex-grow">
                                <h2 className="text-xl font-semibold">
                                    {s.title}
                                </h2>
                                <div className="self-end flex gap-2 text-gray-700">
                                    <div>
                                        <AiOutlineUser className="inline-block mr-1 border-solid border-black border-b rounded-full shadow-sm" />
                                        <span>{s.user.name}</span>
                                    </div>
                                    <div>
                                        <AiOutlineCalendar className="inline-block mr-1" />
                                        <span
                                            title={new Date(
                                                s.createdAt
                                            ).toString()}
                                        >
                                            {getRelativeTime(
                                                new Date(s.createdAt)
                                            )}
                                        </span>
                                    </div>
                                    <div>
                                        <AiOutlineRead className="inline-block mr-1" />
                                        <span>{s.hits} reads</span>
                                    </div>
                                </div>
                                <ul className="flex flex-wrap gap-2">
                                    {s.category.map(c => (
                                        <li className="px-2 py-1 shadow-sm hover:shadow-md border-b rounded-sm border-blue">
                                            <Link
                                                to={`/category/${c.toLowerCase()}`}
                                            >
                                                {formatString(c)}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </Link>
                    ))}
                    {searchResult.nextCursor != -1 && (
                        <div className="cursor-pointer" onClick={fetchMore}>
                            Load More
                        </div>
                    )}
                </>
            ) : (
                <div className="flex justify-center text-2xl">
                    : ( Nothing found
                </div>
            )}
        </div>
    )
}

export default SearchPage
