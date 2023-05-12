import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { AiOutlineUser } from 'react-icons/ai'
import { MdOutlineUnsubscribe } from 'react-icons/md'

export default function Subscription() {
    const [subs, setSubs] = useState([])

    useEffect(() => {
        axios
            .get('/api/subscriptions/', { withCredentials: true })
            .then(res => setSubs(res.data))
    }, [])

    const unsubUser = id => {
        axios
            .delete('/api/subscriptions/', {
                data: { id },
                withCredentials: true,
            })
            .then(res => {
                if (res.status == 200) {
                    setSubs(o => o.filter(x => x._id != id))
                }
            })
    }

    return (
        <div>
            <h2 className="font-bold text-base leading-loose">Subscriptions</h2>
            {subs?.length > 0 ? (
                <ul className="flex items-center gap-4 flex-wrap">
                    {subs?.map(s => (
                        <li
                            key={s._id}
                            className="w-48 rounded-lg bg-white shadow-md hover:shadow-lg"
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
                            <div className="flex w-full justify-end items-center">
                                <MdOutlineUnsubscribe
                                    className="text-2xl cursor-pointer hover:text-red"
                                    onClick={() => unsubUser(s._id)}
                                    title="Unsubscribe"
                                />
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <div className="text-center py-8 text-xl">
                    No users subscribed
                </div>
            )}
        </div>
    )
}
