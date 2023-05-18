import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { loadMoreStats, reloadStats } from '../../redux/actions/stats'
import { statActions } from '../../redux/reducers/stats'

import {
    Bar,
    Bubble,
    Doughnut,
    Line,
    Pie,
    PolarArea,
    Radar,
    Scatter,
} from 'react-chartjs-2'

import {
    AiOutlineDownload,
    AiOutlineReload,
    AiOutlineBarChart,
    AiOutlinePieChart,
    AiOutlineLineChart,
    AiOutlineRadarChart,
    AiOutlineAreaChart,
} from 'react-icons/ai'
import { BsToggleOff, BsToggleOn } from 'react-icons/bs'
import { BiDoughnutChart } from 'react-icons/bi'
import { VscGraphScatter } from 'react-icons/vsc'
import { MdOutlineBubbleChart } from 'react-icons/md'

import UserListTable from './UsersList'
import ArticleListTable from './ArticleList'
import AdsListTable from './AdsListTable'
import CommentsListTable from './CommentsListTable'
import PollsListTable from './PollsListTable'

import { formatString } from '../../utils/formatString'

const objTableMap = {
    users: UserListTable,
    articles: ArticleListTable,
    ads: AdsListTable,
    comments: CommentsListTable,
    polls: PollsListTable,
}

const chartTypes = [
    { name: 'Bar', elem: Bar, icon: AiOutlineBarChart },
    { name: 'Pie', elem: Pie, icon: AiOutlinePieChart },
    { name: 'DoughNut', elem: Doughnut, icon: BiDoughnutChart },
    { name: 'Line', elem: Line, icon: AiOutlineLineChart },
    { name: 'Bubble', elem: Bubble, icon: MdOutlineBubbleChart },
    { name: 'PolarArea', elem: PolarArea, icon: AiOutlineAreaChart },
    { name: 'Radar', elem: Radar, icon: AiOutlineRadarChart },
    { name: 'Scatter', elem: Scatter, icon: VscGraphScatter },
]

const ChartBox = ({ obj, data, type = 0 }) => {
    const [chartIdx, setChartIdx] = useState(type)

    const dispatch = useDispatch()
    const loadMore = () => dispatch(loadMoreStats(obj))
    const reload = () => dispatch(reloadStats(obj))
    const toggle = () => dispatch(statActions.toggleChart(obj))

    const Chart = chartTypes[chartIdx].elem
    const Table = objTableMap[obj]

    const ChartIcon = chartTypes[chartIdx].icon

    const showChart = useSelector(state => state.stats[obj].chart)
    return (
        <div
            className={`border-solid border-black border flex flex-col items-center rounded-lg bg-slate-200 ${
                obj == 'users' && !showChart ? 'col-span-2' : ''
            }`}
        >
            <div className="h-16 w-full relative flex justify-center items-center">
                <h2 className="font-bold">{formatString(obj)}</h2>
                <div className="px-2 absolute right-2 top-4 bottom-4 flex gap-2 items-center justify-center">
                    {showChart ? (
                        <div
                            className="flex flex-col items-end rounded-md hover:shadow-sm cursor-pointer"
                            onClick={() =>
                                setChartIdx(o => (o + 1) % chartTypes.length)
                            }
                        >
                            <ChartIcon className="h-6 w-6 p-1 cursor-pointer" />
                            <span className="text-sm font-extralight">
                                {chartTypes[chartIdx].name}
                            </span>
                        </div>
                    ) : (
                        <>
                            <div
                                className="flex flex-col items-center rounded-md hover:shadow-sm cursor-pointer"
                                onClick={loadMore}
                            >
                                <AiOutlineDownload className="h-6 w-6 p-1 cursor-pointer" />
                                <span className="text-sm font-extralight">
                                    Load More
                                </span>
                            </div>
                            <div
                                className="flex flex-col items-center rounded-md hover:shadow-sm cursor-pointer"
                                onClick={reload}
                            >
                                <AiOutlineReload className="h-6 w-6 p-1 cursor-pointer rotate-hover" />
                                <span className="text-sm font-extralight">
                                    Reload
                                </span>
                            </div>
                        </>
                    )}
                    <div
                        className="flex flex-col items-center rounded-md hover:shadow-sm cursor-pointer"
                        onClick={toggle}
                    >
                        {showChart ? (
                            <BsToggleOff className="h-6 w-6 p-1 cursor-pointer" />
                        ) : (
                            <BsToggleOn className="h-6 w-6 p-1 cursor-pointer" />
                        )}
                        <span className="text-sm font-extralight">
                            {showChart ? 'Chart' : 'Details'}
                        </span>
                    </div>
                </div>
            </div>
            {showChart ? (
                <div className="w-full max-h-[calc(100%-4rem)] flex justify-center justify-self-stretch">
                    <Chart
                        data={data}
                        style={{ width: '100%', height: '100%' }}
                        options={{
                            plugins: {
                                colors: {
                                    forceOverride: true,
                                },
                            },
                        }}
                    />
                </div>
            ) : (
                <div className="w-full h-[calc(100%-4rem)] overflow-y-auto px-2">
                    <Table loadMore={loadMore} />
                </div>
            )}
        </div>
    )
}

export default ChartBox
