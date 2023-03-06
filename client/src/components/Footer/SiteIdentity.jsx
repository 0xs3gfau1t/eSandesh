import React from 'react'
import { Link } from 'react-router-dom'

import { SiteLogo } from '../common'
import SocialIcons from './SocialIcons'

export default function SiteIdentity() {
    return (
        <div className="flex flex-col items-center sm:items-start gap-4">
            <div className="flex flex-col items-center sm:items-start">
                {/* site title and tagline */}
                <SiteLogo />
                <p>खबर नया युग को</p>
            </div>
            {/* social icons*/}
            <SocialIcons />
        </div>
    )
}
