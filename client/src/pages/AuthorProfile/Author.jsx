import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import { RectYAd } from '../../components/common'
import RecentNews from '../Home/RecentNews'
import Content from './Content'

export default function Author() {
    const adsY = useSelector(state => state.ads.rectY)
    const { author } = useParams()
    return (
        <div className="flex justify-between">
            <div className=" w-2/3">
                <Content author={author} />
            </div>
            {/* right side */}
            <div className="hidden w-1/3 sm:flex flex-col items-center px-4">
                {/* ads go here */}
                <RectYAd
                    ad={adsY ? (adsY[1] ? adsY[1] : false) : false}
                    type={'y'}
                />
            </div>
        </div>
    )
}
