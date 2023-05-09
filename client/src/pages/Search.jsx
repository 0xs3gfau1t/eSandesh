import axios from 'axios'
import { useEffect, useState } from 'react'
import { AiOutlineCalendar, AiOutlineRead, AiOutlineUser } from 'react-icons/ai'
import { Link, useSearchParams } from 'react-router-dom'

var units = {
    year: 24 * 60 * 60 * 1000 * 365,
    month: (24 * 60 * 60 * 1000 * 365) / 12,
    day: 24 * 60 * 60 * 1000,
    hour: 60 * 60 * 1000,
    minute: 60 * 1000,
    second: 1000,
}
var rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' })
var getRelativeTime = (d1, d2 = new Date()) => {
    var elapsed = d1 - d2

    for (var u in units)
        if (Math.abs(elapsed) > units[u] || u == 'second')
            return rtf.format(Math.round(elapsed / units[u]), u)
}

const SearchPage = () => {
    const [params, _setParams] = useSearchParams()

    const [searchResult, setSearchResult] = useState([])

    useEffect(() => {
        axios
            .get(`/api/article/search?${params.toString()}`)
            .then(res => setSearchResult(res.data))
    }, [params])

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold">Search Results: </h1>
            {searchResult.length > 0 ? (
                searchResult.map(s => (
                    <Link
                        to={`/news/${s.year}/${s.month}/${s.slug}`}
                        key={s._id}
                        className="flex flex-col border-b-2 border-solid border-slate-400 shadow-lg hover:scale-105 p-8 rounded-md mb-4"
                    >
                        <h2 className="text-xl font-semibold">{s.title}</h2>
                        <div className="self-end flex gap-2 text-gray-700">
                            <div>
                                <AiOutlineUser className="inline-block mr-1 border-solid border-black border-b rounded-full shadow-sm" />
                                <span>{s.user.name}</span>
                            </div>
                            <div>
                                <AiOutlineCalendar className="inline-block mr-1" />
                                <span title={new Date(s.createdAt).toString()}>
                                    {getRelativeTime(new Date(s.createdAt))}
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
                                    <Link to={`/category/${c.toLowerCase()}`}>
                                        {c.charAt(0).toUpperCase() +
                                            c.slice(1).toLowerCase()}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </Link>
                ))
            ) : (
                <div className="flex justify-center text-2xl">
                    : ( Nothing found
                </div>
            )}
        </div>
    )
}

export default SearchPage
