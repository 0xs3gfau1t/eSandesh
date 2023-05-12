import React from 'react'
import { Link } from 'react-router-dom'

export default function ArchiveCard(archive) {
    return (
        <Link to={`/news/${archive.archive.year}/${archive.archive.month}/${archive.archive.slug}`}>
            <div className="flex gap-2 flex-col cursor-pointer border-b-2 hover:shadow-lg transition-shadow duration-300 bg-white mt-2 mb-4 rounded-lg py-4 px-4 mr-10 shadow-sm">
                <div className="flex items-center gap-2 justify-start w-full">
                    <div className="flex flex-col gap-1">
                        <h1 className="text-xl font-secondary font-medium">
                            {archive.archive.title}
                        </h1>
                        <div className="flex gap-2">
                            <span className="text-xs font-thin">
                                {archive.archive.publishedAt.split('T')[0]}
                            </span>
                            <span className="text-xs font-bold">
                                {archive.archive.category.join(', ')}
                            </span>
                        </div>
                        <h4 className='text-sm'>{archive.archive.userInfo.name}</h4>
                    </div>
                </div>
            </div>
        </Link>
    )
}
