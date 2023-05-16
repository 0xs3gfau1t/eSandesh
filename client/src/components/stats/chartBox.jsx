import { useEffect, useState } from 'react'
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

const chartTypes = [
    { name: 'Bar', elem: Bar },
    { name: 'Pie', elem: Pie },
    { name: 'DoughNut', elem: Doughnut },
    { name: 'Line', elem: Line },
    { name: 'Bubble', elem: Bubble },
    { name: 'PolarArea', elem: PolarArea },
    { name: 'Radar', elem: Radar },
    { name: 'Scatter', elem: Scatter },
]

const ChartBox = ({ title, data, type = 0, className = '' }) => {
    const [chartIdx, setChartIdx] = useState(type)

    const Chart = chartTypes[chartIdx]?.elem

    return (
        <div
            className={
                'border-solid border-black border flex flex-col items-center rounded-lg bg-slate-200 ' +
                className
            }
        >
            <div className="h-16 w-full relative flex justify-center items-center">
                <h2 className="font-bold">{title}</h2>
                <span
                    className="cursor-pointer border-black border-solid border-b px-2 absolute right-2 top-4 bottom-4 rounded-md shadow-md"
                    onClick={() =>
                        setChartIdx(o => (o + 1) % chartTypes.length)
                    }
                >
                    {chartTypes[chartIdx].name}
                </span>
            </div>
            <div className="w-full max-h-[calc(100%-4rem)] flex justify-center justify-self-stretch">
                <Chart
                    data={data}
                    style={{ width: '100%', height: '100%', color: 'red' }}
                    color="#ff0000"
                />
            </div>
        </div>
    )
}

export default ChartBox
