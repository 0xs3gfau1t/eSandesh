import { useEffect } from 'react'
import { useSelector } from 'react-redux'

const PollListTable = ({ loadMore }) => {
    const data = useSelector(state => state.stats.polls.data)

    useEffect(() => {
        if (data.length == 0) loadMore()
    }, [])

    return (
        <table className="w-full border-collapse rounded-sm">
            <thead className="">
                <tr className="text-black border-solid">
                    <th className="sticky top-0 bg-slate-300 rounded-tl-md">
                        Id
                    </th>
                    <th className="sticky top-0 bg-slate-300">Votes</th>
                </tr>
            </thead>
            <tbody className="bg-slate-200">
                {data.map(d => (
                    <tr
                        key={d.id}
                        className="border-b border-solid border-gray-300 border-opacity-100"
                    >
                        <td
                            className="border-x border-solid border-gray-300 truncate max-w-[4rem] pl-4"
                            title={d.id}
                        >
                            {d.id}
                        </td>
                        <td className="border-x border-solid border-gray-300 pl-4">
                            {d.votes}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default PollListTable
