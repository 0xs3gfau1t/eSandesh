import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { AiOutlineUser, AiOutlineArrowRight } from 'react-icons/ai'
import { RiMailCloseLine } from 'react-icons/ri'
import { Popup } from '../../components/common'
import { useAxiosError } from '../../utils/useAxiosError'

export default function Subscription() {
    const [subs, setSubs] = useState([])
    const [unsubbing, setUnsubbing] = useState(false)
    const [nextPage, setNextPage] = useState(0)

    const { onError } = useAxiosError()

    const fetchSubs = () => {
        if (nextPage != undefined)
            axios
                .get('/api/subscriptions/', {
                    params: { page: nextPage },
                    withCredentials: true,
                })
                .then(res => {
                    setNextPage(res.data.nextPage)
                    setSubs(o => o.concat(res.data.subs))
                })
                .catch(onError)
    }

    useEffect(fetchSubs, [])

    const unsubUser = () => {
        axios
            .delete('/api/subscriptions/', {
                data: { id: unsubbing },
                withCredentials: true,
            })
            .then(res => {
                if (res.status == 200) {
                    setUnsubbing(false)
                    setSubs(o => o.filter(x => x._id != unsubbing))
                }
            })
            .catch(onError)
    }

    return (
        <div className="py-4">
            <h2 className="font-bold text-base leading-loose">Subscriptions</h2>
            {subs.length > 0 ? (
                <ul className="flex items-center gap-x-8 gap-y-0 flex-wrap">
                    {subs.map(s => (
                        <li
                            key={s._id}
                            className="w-48 rounded-lg bg-white shadow-md hover:shadow-lg my-4"
                        >
                            {s.image ? (
                                <img
                                    src={s.image}
                                    className="w-full h-36 object-cover rounded-t-lg"
                                />
                            ) : (
                                <AiOutlineUser className="w-full h-36" />
                            )}
                            <span className="block text-center py-2">
                                {s.name}
                            </span>
                            <hr className="my-1" />
                            <div className="flex justify-end items-center gap-1 py-1 px-2">
                                <RiMailCloseLine
                                    className="w-5 h-5 cursor-pointer hover:text-red"
                                    onClick={() => setUnsubbing(s._id)}
                                    title="Unsubscribe"
                                />
                            </div>
                        </li>
                    ))}
                    {nextPage !== undefined && (
                        <li
                            className="flex flex-col my-4 shadow-md hover:shadow-lg duration-200 rounded-md bg-white p-4 self-center cursor-pointer"
                            onClick={fetchSubs}
                        >
                            <span className="text-lg">Load More</span>
                            <AiOutlineArrowRight className="align-middle w-full" />
                        </li>
                    )}
                </ul>
            ) : (
                <div className="text-center py-8 text-xl">
                    No users subscribed
                </div>
            )}
            {unsubbing != false && (
                <Popup title="Unsub User" setShow={setUnsubbing}>
                    <h1>Are you sure you want to unsubscribe this user?</h1>
                    <div className="flex justify-end gap-2 items-center">
                        <div
                            className="py-1 px-4 rounded-md cursor-pointer border-blue border-solid border shadow-sm hover:shadow-md"
                            onClick={() => setUnsubbing(false)}
                        >
                            No
                        </div>
                        <div
                            className="py-1 px-4 rounded-md cursor-pointer border-red border-solid border shadown-sm hover:shadow-md"
                            onClick={unsubUser}
                        >
                            Yes
                        </div>
                    </div>
                </Popup>
            )}
        </div>
    )
}
