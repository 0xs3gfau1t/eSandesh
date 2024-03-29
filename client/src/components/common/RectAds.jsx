import React from 'react'
import { Link } from 'react-router-dom'

function RectXAd({ ad }) {
    return (
        <div className="my-1">
            {ad ? (
                <div className="float w-auto relative">
                    <span className="absolute bg-rose-500 px-1 text-sm right-4 text-white">
                        Ad
                    </span>
                    <a href={ad.redirectUrl} target="_blank">
                        <img
                            src={`/api/ads/images?id=${ad._id}&imageType=rectX`}
                        />
                    </a>
                </div>
            ) : (
                <div className="flex items-center justify-center bg-amber-500 h-20">
                    <p className="lg:text-xl text-sm font-secondary text-justify">
                        Place your ads here, contact us at
                        advertise@esandesh.com
                    </p>
                </div>
            )}
        </div>
    )
}

function RectYAd({ ad }) {
    return (
        <div className="my-4 ">
            {ad ? (
                <div className="float relative">
                    <span className="absolute bg-rose-500 px-1 text-sm right-1 text-white">
                        Ad
                    </span>
                    <a href={ad.redirectUrl} target="_blank">
                        <img
                            className="h-screen min-w-fit max-w-96"
                            src={`/api/ads/images?id=${ad._id}&imageType=rectY`}
                        />
                    </a>
                </div>
            ) : (
                <div className="flex items-center justify-center bg-amber-500 h-screen">
                    <div className="lg:text-xl text-sm font-secondary text-justify">
                        <div className="flex flex-col px-4 justify-center">
                            <span>Place</span> <span>your</span>
                            <span>ads</span>
                            <span>here.</span>
                            <span>Contact</span>
                            <span>Us</span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export { RectXAd, RectYAd }
