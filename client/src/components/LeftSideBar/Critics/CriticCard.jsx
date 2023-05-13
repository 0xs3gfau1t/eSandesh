import React from 'react'
import { Link } from 'react-router-dom'
import { FaUserCircle } from 'react-icons/fa'

export default function CriticCard({ articleInfo, name, body, date }) {
    return (
        <div className="flex flex-col items-center cursor-pointer border-b-2 hover:shadow-lg transition-shadow duration-300 bg-white mt-2 mb-4 rounded-lg py-4 px-4 shadow-sm">
            <div className="flex items-center gap-2 justify-start w-full">
                <Link to="userProfie">
                    {/*use user image instead of icon*/}
                    <FaUserCircle className="text-4xl" />
                </Link>
                <div className="flex flex-col">
                    <h4 className="text-lg font-secondary font-medium">
                        {name}
                    </h4>
                    <span className="text-base">{date}</span>
                </div>
            </div>
            <p className="text-base text-justify leading-tight">
                <span className="font-bold pr-1 text-2xl ">''</span>
                {body}
            </p>
            <Link
                className="truncate text-base font-secondary font-bold my-2 text-start w-full hover:text-rose-700 duration-300"
                title="पूरा लेख पढ्न क्लिक गर्नुहोस्"
                to={`/news/${articleInfo?.year}/${articleInfo?.month}/${articleInfo?.slug}`}
            >
                {articleInfo?.title}
            </Link>
        </div>
    )
}
