import React, { useEffect, useState } from 'react'

import { AiOutlineUser, AiOutlineComment } from 'react-icons/ai'
import { GrArticle } from 'react-icons/gr'
import { RiAdvertisementLine } from 'react-icons/ri'
import { BiPoll } from 'react-icons/bi'

// Donot remove this
import { Chart as ChartJS } from 'chart.js/auto'

import CountBox from '../../components/stats/countBox'
import { getRelativeTime } from '../../utils/relativeDuration'
import ChartBox from '../../components/stats/chartBox'
import MetaList from '../../components/stats/MetaList'
import { useDispatch, useSelector } from 'react-redux'
import { loadMoreStats } from '../../redux/actions/stats'
import StatFilters from '../../components/stats/Filters'

export default function ViewSiteStats() {
    const data = useSelector(state => state.stats[state.stats.active].data)
    const activeMeta = useSelector(state => state.stats.activeMetaIdx)

    const dispatch = useDispatch()

    useEffect(() => {
        if (data.length == 0) dispatch(loadMoreStats())
    }, [])

    if (data.length == 0) return <div>Loading</div>

    return (
        <div className="w-full h-full p-2 flex flex-col max-h-full bg-slate-100">
            <div className="h-8 relative">
                <h2 className="text-2xl font-mono font-bold">Stats</h2>
                <StatFilters />
            </div>
            <div className="flex flex-row gap-2 justify-around col-span-full h-36 py-4">
                <CountBox
                    title="Users"
                    count={data[activeMeta].users.count}
                    Icon={AiOutlineUser}
                    info={`Users count ${getRelativeTime(
                        data[activeMeta].createdAt
                    )}`}
                    style={{
                        background:
                            'linear-gradient(200deg, rgba(77,77,191,1) 0%, rgba(54,53,223,1) 69%)',
                    }}
                />
                <CountBox
                    title="Ads"
                    count={data[activeMeta].ads.count}
                    Icon={RiAdvertisementLine}
                    info={`Advertisement count ${getRelativeTime(
                        data[activeMeta].createdAt
                    )}`}
                    style={{
                        background:
                            'linear-gradient(200deg, rgba(37,205,43,1) 0%, rgba(36,175,41,1) 69%)',
                    }}
                />
                <CountBox
                    title="Articles"
                    count={data[activeMeta].articles.count}
                    Icon={GrArticle}
                    info={`Articles count ${getRelativeTime(
                        data[activeMeta].createdAt
                    )}`}
                    style={{
                        background:
                            'linear-gradient(200deg, rgba(237,167,145,1) 0%, rgba(245,128,90,1) 69%)',
                    }}
                />
                <CountBox
                    title="Comments"
                    count={data[activeMeta].comments.count}
                    Icon={AiOutlineComment}
                    info={`Comments count ${getRelativeTime(
                        data[activeMeta].createdAt
                    )}`}
                    style={{
                        background:
                            'linear-gradient(200deg, rgba(70,197,241,1) 0%, rgba(99,156,218,1) 69%)',
                    }}
                />
                <CountBox
                    title="Polls"
                    count={data[activeMeta].polls.count}
                    Icon={BiPoll}
                    info={`Polls count ${getRelativeTime(
                        data[activeMeta].createdAt
                    )}`}
                    style={{
                        background:
                            'linear-gradient(200deg, rgba(147,86,250,1) 0%, rgba(127,68,226,1) 69%)',
                    }}
                />
            </div>
            <div className="flex-grow max-h-full grid grid-cols-3 grid-rows-2 gap-x-2 gap-y-4 h-[calc(100%-12rem)] p-4">
                <MetaList
                    data={data.map(d => ({
                        _id: d._id,
                        createdAt: d.createdAt,
                    }))}
                />
                <ChartBox
                    title="Users"
                    type={0}
                    data={{
                        datasets: [
                            {
                                data: data.map(d => d.users.rootUsers),
                                label: 'Admins',
                            },
                            {
                                data: data.map(d => d.users.publisher),
                                label: 'Publishers',
                            },
                            {
                                data: data.map(d => d.users.reporters),
                                label: 'Reporters',
                            },
                        ],
                        labels: data.map(d => getRelativeTime(d.createdAt)),
                    }}
                />
                <ChartBox
                    title="Articles"
                    type={3}
                    data={{
                        datasets: [
                            {
                                data: data.map(d => d.articles.hits),
                                label: 'Total article reads',
                            },
                        ],
                        labels: data.map(d => getRelativeTime(d.createdAt)),
                    }}
                />
                <ChartBox
                    title="Ads"
                    type={0}
                    data={{
                        datasets: [
                            {
                                data: data.map(d => d.ads.hits),
                                label: 'Total ads shown',
                            },
                        ],
                        labels: data.map(d => getRelativeTime(d.createdAt)),
                    }}
                />
                <ChartBox
                    title="Comments"
                    type={1}
                    data={{
                        datasets: [
                            {
                                data: data.map(d => d.comments.likes),
                                label: 'Total comment interactions',
                            },
                        ],
                        labels: data.map(d => getRelativeTime(d.createdAt)),
                    }}
                />
                <ChartBox
                    title="Polls"
                    type={2}
                    data={{
                        datasets: [
                            {
                                data: data.map(d => d.polls.votes),
                                label: 'Total polls votes',
                            },
                        ],
                        labels: data.map(d => getRelativeTime(d.createdAt)),
                    }}
                    style={{ width: '100%', height: '100%' }}
                />
            </div>
        </div>
    )
}
