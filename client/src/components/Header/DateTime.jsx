import React from 'react'
import { BsClock, BsCalendarDay } from 'react-icons/bs'

export default function DateTime() {
    return (
        <div className="flex place-items-center gap-1">
            <div className="flex flex-col gap-2 text-xl text-black">
                <BsClock />
                <BsCalendarDay />
            </div>
            <iframe
                allowtransparency="true"
                src="https://www.ashesh.com.np/linknepali-time.php?time_only=no&font_color=333333&aj_time=yes&font_size=16&line_brake=1&sec_time=no&nst=no&api=671159n225"
                width="195"
                height="75"
                className="!outline-0"
            ></iframe>
        </div>
    )
}
