import React, { useEffect, useState } from 'react'
import axios from 'axios'

import { AiOutlineUser, AiOutlineComment } from 'react-icons/ai'
import { GrArticle } from 'react-icons/gr'
import { RiAdvertisementLine } from 'react-icons/ri'
import { BiPoll } from 'react-icons/bi'

// Donot remove this
import { Chart as ChartJS } from 'chart.js/auto'

import CountBox from '../../components/stats/countBox'
import { getRelativeTime } from '../../utils/relativeDuration'
import ChartBox from '../../components/stats/chartBox'

const sample = [
    {
        _id: '64634fcc40e8d92bd192b2cf',
        users: {
            rootUsers: 2,
            publisher: 21,
            count: 21092,
        },
        ads: {
            count: 21,
            hits: 2001,
        },
        articles: {
            count: 680,
            hits: 73601,
        },
        comments: {
            count: 291,
            likes: 29021,
        },
        polls: {
            count: 25,
            votes: 269,
        },
        createdAt: '2023-05-16T09:41:32.076Z',
    },
    {
        _id: '64634bba55e4a6e64ea2adb9',
        users: {
            rootUsers: 1,
            publisher: 5,
            count: 14981,
        },
        ads: {
            count: 10,
            hits: 1287,
        },
        articles: {
            count: 492,
            hits: 26879,
        },
        comments: {
            count: 124,
            likes: 15068,
        },
        polls: {
            count: 12,
            votes: 108,
        },
        createdAt: '2023-04-16T09:24:10.557Z',
    },
]

export default function ViewSiteStats() {
    const [data, setData] = useState(sample)

    return (
        <div className="w-full h-full p-2 flex flex-col max-h-full bg-slate-100">
            <div className="h-8">
                <span className="text-2xl font-mono">Stats</span>
            </div>
            <div className="flex flex-row gap-2 justify-around col-span-full h-36 py-4">
                <CountBox
                    title="Users"
                    count={data[0].users.count}
                    Icon={AiOutlineUser}
                    info={`Users count ${getRelativeTime(data[0].createdAt)}`}
                    style={{
                        background:
                            'linear-gradient(135deg, rgba(255,41,191,1) 0%, rgba(113,0,255,1) 100%)',
                    }}
                />
                <CountBox
                    title="Ads"
                    count={data[0].ads.count}
                    Icon={RiAdvertisementLine}
                    info={`Advertisement count ${getRelativeTime(
                        data[0].createdAt
                    )}`}
                    style={{
                        background:
                            'linear-gradient(135deg, rgba(0,243,255,1) 0%, rgba(0,37,255,1) 100%)',
                    }}
                />
                <CountBox
                    title="Articles"
                    count={data[0].articles.count}
                    Icon={GrArticle}
                    info={`Articles count ${getRelativeTime(
                        data[0].createdAt
                    )}`}
                    style={{
                        background:
                            'linear-gradient(135deg, rgba(255,179,6,1) 30%, rgba(255,83,0,1) 100%)',
                    }}
                />
                <CountBox
                    title="Comments"
                    count={data[0].comments.count}
                    Icon={AiOutlineComment}
                    info={`Comments count ${getRelativeTime(
                        data[0].createdAt
                    )}`}
                    style={{
                        background:
                            'linear-gradient(135deg, rgba(172,255,6,1) 0%, rgba(0,187,36,1) 100%)',
                    }}
                />
                <CountBox
                    title="Polls"
                    count={data[0].polls.count}
                    Icon={BiPoll}
                    info={`Polls count ${getRelativeTime(data[0].createdAt)}`}
                    style={{
                        background:
                            'linear-gradient(135deg, rgba(208,6,255,1) 0%, rgba(0,20,254,1) 100%)',
                    }}
                />
            </div>
            <div className="flex-grow max-h-full grid grid-cols-3 grid-rows-2 gap-x-2 gap-y-4 h-[calc(100%-12rem)] p-4">
                <ChartBox
                    title="Articles"
                    type={1}
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
