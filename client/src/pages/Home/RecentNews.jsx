import React from 'react'
import { Link } from 'react-router-dom'
import { FaAngleDoubleRight } from 'react-icons/fa'

export default function RecentNews({ data }) {
    return (
        <ul className="flex flex-col justify-between gap-1 ">
            {data.map((hot, index) => {
                return (
                    <li key={index} className="flex my-1">
                        <span className="w-4 h-6 mr-2 font-medium py-1">
                            <FaAngleDoubleRight />
                        </span>
                        <span className="text-xl hover:pl-4 hover:text-rose-700 transition-all duration-300">
                            <Link
                                to={`/news/${hot.year}/${hot.month}/${hot.slug}`}
                            >
                                {hot.title}
                            </Link>
                        </span>
                    </li>
                )
            })}
        </ul>
    )
}
