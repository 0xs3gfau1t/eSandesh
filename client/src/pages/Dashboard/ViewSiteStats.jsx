import React, { useEffect } from 'react'

import { AiOutlineUser, AiOutlineComment } from 'react-icons/ai'
import { GrArticle } from 'react-icons/gr'
import { RiAdvertisementLine } from 'react-icons/ri'
import { BiPoll } from 'react-icons/bi'

// Donot remove this
import { Chart as ChartJS } from 'chart.js/auto'

import CountBox from '../../components/stats/countBox'
import { getRelativeTime } from '../../utils/relativeDuration'
import MetaList from '../../components/stats/MetaList'
import { useDispatch, useSelector } from 'react-redux'
import { loadMoreStats } from '../../redux/actions/stats'
import StatFilters from '../../components/stats/Filters'
import {
    AdsChart,
    ArticleChart,
    CommentsChart,
    PollsChart,
    UserChart,
} from '../../components/stats/charts'

export default function ViewSiteStats() {
    const { showMeta, metadata, activeMetaIdx } = useSelector(state => {
        return {
            metadata: state.stats.meta.data,
            activeMetaIdx: state.stats.activeMetaIdx,
            showMeta: state.stats.users.chart,
        }
    })

    const dispatch = useDispatch()

    useEffect(() => {
        if (metadata.length == 0) dispatch(loadMoreStats('meta'))
    }, [])

    if (metadata.length == 0) return <div>Loading</div>

    return (
        <div className="w-full h-full p-2 flex flex-col max-h-full bg-slate-100">
            <div className="h-8 relative">
                <h2 className="text-2xl font-mono font-bold">Stats</h2>
                <StatFilters type="meta" />
            </div>
            <div className="flex flex-row gap-2 justify-around col-span-full h-36 py-4">
                <CountBox
                    title="Users"
                    count={metadata[activeMetaIdx].users.count}
                    Icon={AiOutlineUser}
                    info={`Users count ${getRelativeTime(
                        metadata[activeMetaIdx].createdAt
                    )}`}
                    style={{
                        background:
                            'linear-gradient(200deg, rgba(77,77,191,1) 0%, rgba(54,53,223,1) 69%)',
                    }}
                />
                <CountBox
                    title="Ads"
                    count={metadata[activeMetaIdx].ads.count}
                    Icon={RiAdvertisementLine}
                    info={`Advertisement count ${getRelativeTime(
                        metadata[activeMetaIdx].createdAt
                    )}`}
                    style={{
                        background:
                            'linear-gradient(200deg, rgba(37,205,43,1) 0%, rgba(36,175,41,1) 69%)',
                    }}
                />
                <CountBox
                    title="Articles"
                    count={metadata[activeMetaIdx].articles.count}
                    Icon={GrArticle}
                    info={`Articles count ${getRelativeTime(
                        metadata[activeMetaIdx].createdAt
                    )}`}
                    style={{
                        background:
                            'linear-gradient(200deg, rgba(237,167,145,1) 0%, rgba(245,128,90,1) 69%)',
                    }}
                />
                <CountBox
                    title="Comments"
                    count={metadata[activeMetaIdx].comments.count}
                    Icon={AiOutlineComment}
                    info={`Comments count ${getRelativeTime(
                        metadata[activeMetaIdx].createdAt
                    )}`}
                    style={{
                        background:
                            'linear-gradient(200deg, rgba(70,197,241,1) 0%, rgba(99,156,218,1) 69%)',
                    }}
                />
                <CountBox
                    title="Polls"
                    count={metadata[activeMetaIdx].polls.count}
                    Icon={BiPoll}
                    info={`Polls count ${getRelativeTime(
                        metadata[activeMetaIdx].createdAt
                    )}`}
                    style={{
                        background:
                            'linear-gradient(200deg, rgba(147,86,250,1) 0%, rgba(127,68,226,1) 69%)',
                    }}
                />
            </div>
            <div className="flex-grow max-h-full grid grid-cols-3 grid-rows-2 gap-x-2 gap-y-4 h-[calc(100%-12rem)] p-4">
                {showMeta && <MetaList />}
                <UserChart />
                <ArticleChart />
                <AdsChart />
                <CommentsChart />
                <PollsChart />
            </div>
        </div>
    )
}
