import React from 'react'
import { Link } from 'react-router-dom'
import { getCatMap } from '../../utils/categoryMap'

export default function HeroSection({ cat, data }) {
    const catMap = getCatMap()
    if (data) {
        return (
            <div className="w-full mb-10">
                <h1 className="text-4xl font-primary font-bold my-2">
                    {cat == 'recent'
                        ? 'ताजा अपडेट '
                        : catMap[cat] + 'मा जल्दो बल्दो के छ?'}
                </h1>
                <p className="w-full">
                    <img
                        className="w-full"
                        src={
                            data.img
                                ? data.img
                                : 'https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png'
                        }
                    />
                </p>
                <div className="">
                    <h1 className="text-3xl font-semibold mt-4 mb-2">
                        <Link
                            to={`/news/${data.year}/${data.month}/${data.slug}`}
                            className="hover:text-rose-600 duration-300"
                        >
                            {data.title}
                        </Link>
                    </h1>
                </div>
            </div>
        )
    } else {
        return (
            <h1 className="text-center py-2 text-2xl my-10">
                {catMap[cat]} वर्गमा थप कुनै समाचार छैन।
            </h1>
        )
    }
}
