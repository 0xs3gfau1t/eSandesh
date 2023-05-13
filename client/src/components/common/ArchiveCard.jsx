import React from 'react'
import { BiArchive, BiUndo } from 'react-icons/bi'
import { Link } from 'react-router-dom'

export default function ArchiveCard({ archive, convertToArchive, unArchive }) {
    return (
        <div className="flex cursor-pointer border-b-2 hover:shadow-lg transition-shadow duration-300 bg-white mt-2 mb-4 rounded-lg py-4 px-4 mr-10 shadow-sm justify-between">
            <Link to={`/news/${archive.year}/${archive.month}/${archive.slug}`}>
                <div className="flex items-center gap-2 justify-start w-full">
                    <div className="flex flex-col gap-1">
                        <h1 className="text-xl font-secondary font-medium">
                            {archive.title}
                        </h1>
                        <div className="flex gap-2">
                            <span className="text-xs font-thin">
                                {archive.publishedAt.split('T')[0]}
                            </span>
                            <span className="text-xs font-bold">
                                {archive.category.join(', ')}
                            </span>
                        </div>
                        <h4 className="text-sm">{archive.author.name}</h4>
                    </div>
                </div>
            </Link>
            {convertToArchive && (
                <div className="border border-2 border-slate-700 rounded-md pl-4 py-2 self-center text-center hover:border-rose-700 duration-200">
                    <BiArchive onClick={convertToArchive} className="mr-4" />
                </div>
            )}
            {unArchive && (
                <div className="border border-2 border-slate-700 rounded-md pl-4 py-2 self-center text-center hover:border-green-300 duration-200">
                    <BiUndo onClick={unArchive} className="mr-4" />
                </div>
            )}
        </div>
    )
}
