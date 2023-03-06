import React from 'react'

import PreferredNews from './PreferredNews'
import QuickUpdates from './QuickUpdates'
import { SeeAllBtn, SqAds } from '../common'

function RightSideBar() {
    return (
        <>
            <div className="flex justify-between items-baseline my-2">
                <h3 className="text-xl font-primary font-semibold">
                    ताजा परिणामहरु
                </h3>
                <SeeAllBtn url={'/category/sports'} />
            </div>
            <QuickUpdates />

            {/* end of a section */}
            <div className="flex justify-between items-end mt-8 mb-2">
                <h3 className="text-xl font-primary font-semibold">
                    तपाईंको प्राथमिकता
                </h3>
                <SeeAllBtn url={'/category/preference'} />
            </div>
            <PreferredNews />
            <div className="">
                <SqAds />
            </div>
            {/* end of a section */}
        </>
    )
}

export default RightSideBar
