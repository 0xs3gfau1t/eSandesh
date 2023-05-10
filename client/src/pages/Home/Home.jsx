import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Outlet } from 'react-router-dom'

import { Footer, Header, LeftSideBar, RightSideBar } from '../../components'
import { getRelAds } from '../../redux/actions/ads'

export default function Home({ session }) {
    const focus = useSelector(state => state.misc.focus)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getRelAds({ limit: 5, type: 'rectX' }))
    }, [])

    return (
        <div className="flex flex-col h-screen">
            <Header session={session} />

            <div className="flex justify-between w-full gap-6 container px-2 mt-2">
                {/* left side */}
                {!focus && (
                    <div className="sm:block hidden w-1/5">
                        <LeftSideBar />
                    </div>
                )}
                {/* if some category is active, it is rendered on outlet */}
                <div className={focus ? 'w-3/5 mx-auto' : 'w-3/5'}>
                    <Outlet />
                </div>
                {/* right side */}
                {!focus && (
                    <div className="sm:w-1/5 pr-1 sm:block hidden">
                        <RightSideBar />
                    </div>
                )}
            </div>
            <Footer />
        </div>
    )
}
