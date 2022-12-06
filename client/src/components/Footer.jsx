import React from 'react'
import { SiteLogo } from '../components/common'
import { FaFacebookF, FaTwitter, FaYoutube} from 'react-icons/fa'

function Footer() {
  return (
    <div className='fixed bottom-0 w-full bg-[#D9D9D9] text-black flex justify-evenly py-3'>
        <SiteLogo/>
        <div className='flex-row'>
            <h1>About Us</h1>
            <p className='text-slate-700'>smth smth</p>
        </div>
        <div>
            <h1>Important Links</h1>
            <div className='text-slate-700'>
                <a href = "advertisement"><p>Advertisement</p></a>
                <a href='feedback'><p>Feedback</p></a>
                <a href ='contact'><p>Contact Us</p></a>
            </div>
            
            <div className='flex-col'>
                <a><span><FaFacebookF/></span></a>
                <a><span><FaTwitter/></span></a>
                <a><span><FaYoutube/></span></a>
            </div>
        </div>
        <div>
            <h1>Address</h1>
            <div className='text-slate-700'>
                <p>eSandesh Publication</p>
                <p>Pokhara -16, Kaski Nepal</p>
                <p>9881 442 441</p>
                <p>contact@esandesh.com</p>
            </div>
        </div>
    </div>
  )
}
export default Footer