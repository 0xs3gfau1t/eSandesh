import React from 'react'
import { useSelector } from 'react-redux'
import { RectXAd, RectYAd } from '../../components/common'
import RecentNews from '../Home/RecentNews'
import Content from './Content'

export default function Category() {
    const adsY = useSelector(state => state.ads.rectY)
    const adsX = useSelector(state => state.ads.rectX)
    return (
        <div className="flex flex-col justify-between">
            {/* left-side that contains news */}
            <div className="flex gap-4 w-min-2/3">
                <Content />
                <RectYAd ad={adsY ? (adsY[1] ? adsY[1] : false) : false} />
            </div>
            {/* right side */}
            <div className="hidden w-1/3 sm:flex flex-col items-center px-4">
                {/* ads go here */}
            </div>
            <RectXAd ad={adsX ? (adsX[1] ? adsX[1] : false) : false} />
        </div>
    )
}
