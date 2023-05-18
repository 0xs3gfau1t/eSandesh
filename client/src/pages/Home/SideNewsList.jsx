import React from 'react'
import { Link } from 'react-router-dom'

import { FaAngleDoubleRight } from 'react-icons/fa'
import { SeeAllBtn } from '../../components/common'
import { getCatMap } from '../../utils/categoryMap'

export default function SideNewsList({ category, data }) {
    const cats = getCatMap()
    if (data.length > 0)
        return (
            <>
                <ul className="py-2">
                    {data.map((news, index) => {
                        return (
                            <li key={index} className="flex items-start my-1">
                                <span className="w-4 h-6 mr-2 font-medium py-1">
                                    <FaAngleDoubleRight />
                                </span>
                                <span className="hover:text-rose-700 duration-200 text-xl transition-all">
                                    <Link
                                        to={`news/${news.year}/${news.month}/${news.slug}`}
                                    >
                                        {news.title}
                                    </Link>
                                </span>
                            </li>
                        )
                    })}
                </ul>
                <div className="w-full flex justify-end">
                    <SeeAllBtn url={`/category/${category}`} />
                </div>
            </>
        )
    else
        return (
            <h1>{cats[category.toLowerCase()]} वर्गमा थप कुनै समाचार छैन।</h1>
        )
}
