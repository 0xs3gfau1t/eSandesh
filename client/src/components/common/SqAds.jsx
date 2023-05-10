import React from 'react'

export default function SqAds({ ad }) {
    // console.log('Sqr ad ', ad._id)
    return (
        <div>
            {ad ? (
                <div className="float w-auto relative">
                    <span className="absolute bg-rose-500 px-1 text-sm right-4 text-white">
                        Ad
                    </span>
                    <a href={ad.redirectUrl} target="_blank">
                        <img
                            src={`/api/ads/images?id=${ad._id}&imageType=square`}
                        />
                    </a>
                </div>
            ) : (
                <div className=" h-64 bg-darkblue w-full text-center text-white flex justify-center items-center ">
                    Place your ads here. <br />
                    advertise@esandesh.com
                </div>
            )}
        </div>
    )
}
