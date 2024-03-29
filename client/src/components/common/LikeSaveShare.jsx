import React from 'react'
import { BiAddToQueue, BiLike, BiShareAlt } from 'react-icons/bi'

export default function LikeSaveShare({ likes, id }) {
    return (
        <div className="flex w-36 justify-between items-center gap-2">
            <span className="flex items-end cursor-pointer text-xl transition-all duration-200 hover:text-green-600">
                <BiLike />
                {<span className="text-xs ml-1">{likes} हजार</span>}
            </span>
            <span className=" cursor-pointer text-xl transition-all duration-200 hover:text-orange-500">
                <BiAddToQueue />
            </span>
            <span className=" cursor-pointer text-xl transition-all duration-200 hover:text-sky-600 ">
                <BiShareAlt />
            </span>
        </div>
    )
}
