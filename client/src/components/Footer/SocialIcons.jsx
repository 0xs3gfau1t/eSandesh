import React from 'react'
import { FaFacebookF, FaTwitter, FaYoutube } from 'react-icons/fa'

export default function SocialIcons() {
    return (
        <div className="flex gap-3 items-cente">
            <a href="https://www.facebook.com" target={'_blank'}>
                <span className="hover:text-[#4267B2] duration-200 ">
                    <FaFacebookF className="text-2xl" />
                </span>
            </a>
            <a href="https://www.twitter.com" target={'_blank'}>
                <span className="hover:text-[#1DA1F2] duration-200 ">
                    <FaTwitter className="text-2xl" />
                </span>
            </a>
            <a href="https://www.youtube.com" target={'_blank'}>
                <span className="hover:text-[#FF0000] duration-200 ">
                    <FaYoutube className="text-2xl" />
                </span>
            </a>
        </div>
    )
}
