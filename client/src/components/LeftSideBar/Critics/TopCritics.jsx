import { useState, useEffect } from 'react'
import { CgScrollV } from 'react-icons/cg'
import axios from 'axios'

import CriticCard from './CriticCard'
export default function TopCritics() {
    const [critics, setCritics] = useState([])

    const listCritics = async () => {
        axios
            .get('/api/critics/list?limit=5&timeRange=50')
            .then(res => {
                setCritics(res.data.critics)
            })
            .catch(err => {
                console.log(err)
            })
    }
    useEffect(() => {
        listCritics()
    }, [])
    const dateOpt = {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    }

    return (
        <div className="mt-2 mb-4 w-full">
            <h2 className="font-bold text-2xl leading-loose flex place-items-center gap-2">
                शीर्ष आलोचकहरू <CgScrollV className="text-2xl" />
            </h2>
            <div className="overflow-y-scroll h-[80vh]">
                {/* list of critics */}
                {critics &&
                    critics.map(critic => {
                        return (
                            <CriticCard
                                key={critic.commentInfo._id}
                                articleInfo={critic.articleInfo}
                                name={critic.commentUserInfo.name}
                                body={critic.commentInfo.content}
                                date={new Date(
                                    critic.updatedAt
                                ).toLocaleDateString('en-US', dateOpt)}
                            />
                        )
                    })}
            </div>
        </div>
    )
}
