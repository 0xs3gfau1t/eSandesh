import React from 'react'

function Footer() {
  return (
    <div className='fixed bottom-0 w-full bg-black text-white flex justify-evenly py-3'>
        <div className='flex-row'>
            <h1>About Us</h1>
            <p className='text-slate-400'>smth smth</p>
        </div>
        <div className='flex-row'>
            <h1>Important Links</h1>
            <div className='flex-row text-slate-400'>
                <a href = "advertisement"><p>Advertisement</p></a>
                <a href='feedback'><p>Feedback</p></a>
                <a href ='contact'><p>Contact Us</p></a>
            </div>
            <div>
                contact pages haru hai maicha
            </div>
        </div>
        <div>
            <h1>Address</h1>
            <div className='text-slate-400'>
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