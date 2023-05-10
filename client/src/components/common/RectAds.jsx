import React from 'react'
import { Link } from 'react-router-dom'

export default function RectAds({ ad }) {
    return (
        <div className="">
            {ad ? (
                <div>
                    <span className="static ml-full">Ad</span>
                    <a href={ad.redirectUrl} target="_blank">
                        <img
                            className="w-auto"
                            src={`api/ads/images?id=${ad._id}&imageType=rectX`}
                        />
                    </a>
                </div>
            ) : (
                <div className="flex items-center justify-center bg-amber-500 h-20">
                    <h3 className="lg:text-xl text-sm font-secondary">
                        <a
                            href={
                                'https://media.tenor.com/IRcIGzwz7IQAAAAC/money-wallet.gif'
                            }
                            target="_blank"
                        >
                            {'Place your ads here'}
                        </a>
                    </h3>
                    {/* <p>mostly ads are images/gifs so this is not needed</p> */}
                </div>
            )}
        </div>
    )
}
