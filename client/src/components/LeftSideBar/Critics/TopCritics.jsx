import { useState, useEffect } from 'react'
import axios from 'axios'

import CriticCard from './CriticCard'
import { Link } from 'react-router-dom'

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
            <h2 className="font-bold text-2xl leading-loose">
                शीर्ष आलोचकहरू
                <Link to="/explore-critics" className="text-sm ml-3">
                    {'अझ हेर्नुहोस् >>'}
                </Link>
            </h2>
            <div>
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
