import React from 'react'
import { Link } from 'react-router-dom'

export default function ArticlePreviewSm({
    title,
    // summary,
    imgUrl,
    articleUrl,
}) {
    return (
        <div className="flex p-1 min-w-[35%] max-w-fit bg-white rounded-lg shadow-sm hover:shadow-xl border-b-2 duration-200 h-28 items-center justify-between my-2">
            <div className="flex gap-1 place-items-center">
                <Link to={articleUrl} className="w-1/3">
                    <img
                        src={imgUrl}
                        className="rounded-sm w-full h-full object-cover"
                    />
                </Link>
                {/* <div className="w-2/3 flex flex-col justify-between h-full"> */}
                <h3 className="w-2/3 h-full flex items-center lg:text-md text-sm font-secondary font-medium hover:text-rose-600 duration-300">
                    {/* <h3 className="lg:text-md text-sm font-secondary font-medium hover:text-rose-600 duration-300"> */}
                    <Link to={articleUrl}>{title}</Link>
                </h3>
            </div>
        </div>
    )
}
