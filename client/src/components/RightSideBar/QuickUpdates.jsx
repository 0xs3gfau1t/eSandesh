import React from 'react'
// import { Link } from "react-router-dom";
import { GiBrazilFlag } from 'react-icons/gi'
import { GrFlagFill } from 'react-icons/gr'

export default function QuickUpdates() {
    return (
        // <div>
        <div className="flex flex-col ">
            <h3 className="text-base underline-offset-4 underline text-center font-semibold">
                फिफा विश्वकप
                {/*this title changes according to current context/events */}
            </h3>
            <iframe
                src="https://www.ashesh.com.np/rashifal/widget.php?header_title=Nepali Rashifal&header_color=f0b03f&api=671155n037"
                className="w-min"
            ></iframe>
            <br />
        </div>
        // </div>
    )
}
