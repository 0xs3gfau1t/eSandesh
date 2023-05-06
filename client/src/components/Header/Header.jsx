import { useState, useRef } from 'react'
import { IoMdArrowDropdown, IoMdPerson } from 'react-icons/io'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { signOut } from 'next-auth/react'

import { setAlert } from '../../redux/actions/misc'
import { SiteLogo } from '../common'
import Forex from './Forex'
import GoldSilver from './GoldSilver'

export default function Header({ session }) {
    const [show, setShow] = useState(false)
    const ref = useRef(null)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const action = () => {
        if (session?.status == 'authenticated') {
            setShow(false)
            dispatch(setAlert('Logged Out', 'success'))
            signOut({ redirect: false })
        } else navigate('/userauth')
    }

    return (
        <div className="header">
            <div className="flex justify-between items-center container p-3">
                <div className="flex flex-col items-center sm:items-start cursor-pointer">
                    <SiteLogo />
                </div>
                <div className="relative flex justify-between items-center gap-6">
                    <div className="flex justify-end invisible md:visible text-xs lg:text-sm gap-4">
                        <Forex />
                        <GoldSilver />
                    </div>
                    <div className="flex gap-1">
                        <IoMdPerson className="text-4xl cursor-pointer" />
                        {session?.status == 'authenticated' && (
                            <h2 className="text-sm">
                                {session?.data?.user?.name}
                            </h2>
                        )}
                        <IoMdArrowDropdown
                            className={`${
                                show ? 'rotate-180' : ''
                            } text-4xl cursor-pointer transition-all duration-200`}
                            onClick={e => setShow(!show)}
                        />
                    </div>

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
                                <hr className="w-11/12 border-neutral-300" />
                                <Link to="/profile/">
                                    <li onClick={e => setShow(false)}>
                                        प्रोफाइल
                                    </li>
                                </Link>
                                <hr className="w-11/12 border-neutral-300" />
                                <li onClick={action}>
                                    {session?.status == 'authenticated'
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
