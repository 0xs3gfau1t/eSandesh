import { useState, useRef } from 'react'
import { FaRegUserCircle } from 'react-icons/fa'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { signOut, useSession } from 'next-auth/react'

import { setAlert } from '../../redux/actions/misc'
import { SiteLogo } from '../common'
import Forex from './Forex'
import GoldSilver from './GoldSilver'

export default function Header() {
    const [show, setShow] = useState(false)
    const ref = useRef(null)
    const navigate = useNavigate()
    const session = useSession()
    const dispatch = useDispatch()
    const action = () => {
        if (session.status == 'authenticated') {
            setShow(false)
            dispatch(setAlert('Logged Out', 'success'))
            signOut({ redirect: false })
        } else navigate('/userauth')
    }

    return (
        <div className="header mb-5">
            <div className="flex justify-between items-center container p-3">
                <div className="flex flex-col items-center sm:items-start">
                    <SiteLogo />
                    <p>खबर नया युग को</p>
                </div>
                <div className="relative flex justify-between items-center">
                    <div className="flex justify-between invisible md:visible text-xs lg:text-sm gap-4">
                        <Forex />
                        <GoldSilver />
                    </div>
                    <FaRegUserCircle
                        className="text-3xl cursor-pointer"
                        onClick={e => setShow(!show)}
                    />
                    {show && (
                        <>
                            <div
                                className="fixed inset-0 w-full h-full bg-black opacity-10"
                                onClick={() => setShow(false)}
                            ></div>
                            <ul
                                ref={ref}
                                className="header-drop absolute z-99 right-0 mt-32 p-2 w-36 text-center border-blue border-2 rounded-md font-bold text-xl"
                            >
                                <Link to="/profile">
                                    <li onClick={e => setShow(false)}>
                                        प्रोफाइल
                                    </li>
                                </Link>
                                <hr className="w-11/12 border-neutral-300" />
                                <li onClick={action}>
                                    {session.status == 'authenticated'
                                        ? 'लग आउट'
                                        : 'लग इन'}
                                </li>
                            </ul>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}
