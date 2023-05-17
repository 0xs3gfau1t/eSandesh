import { useEffect } from 'react'
import { useSelector } from 'react-redux'

const UserListTable = ({ loadMore }) => {
    const data = useSelector(state => state.stats.users.data)

    useEffect(() => {
        if (data.length == 0) loadMore()
    }, [])

    return (
        <table className="w-full border-collapse rounded-sm">
            <thead className="sticky top-0 border-x border-solid border-gray-300 bg-slate-300">
                <tr className="text-black border-solid">
                    <th className="rounded-tl-md" rowSpan={2}>
                        Id
                    </th>
                    <th colSpan={3}>Comments</th>
                    <th colSpan={2}>Articles</th>
                    <th rowSpan={2}>Published Ads</th>
                    <th colSpan={2}>Subscription</th>
                    <th className="rounded-tr-md" rowSpan={2}>
                        Voted Polls
                    </th>
                </tr>
                <tr>
                    <th>Written</th>
                    <th>Liked</th>
                    <th>Received</th>
                    <th>Written</th>
                    <th>Saved</th>
                    <th>Outgoing</th>
                    <th>Incoming</th>
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
                            {d.comments}
                        </td>
                        <td className="border-x border-solid border-gray-300 pl-4">
                            {d.likedComments}
                        </td>
                        <td className="border-x border-solid border-gray-300 pl-4">
                            {d.receivedLikes}
                        </td>
                        <td className="border-x border-solid border-gray-300 pl-4">
                            {d.createdArticles}
                        </td>
                        <td className="border-x border-solid border-gray-300 pl-4">
                            {d.savedArticles}
                        </td>
                        <td className="border-x border-solid border-gray-300 pl-4">
                            {d.publishedAds}
                        </td>
                        <td className="border-x border-solid border-gray-300 pl-4">
                            {d.subscribing}
                        </td>
                        <td className="border-x border-solid border-gray-300 pl-4">
                            {d.subscriber}
                        </td>
                        <td className="border-x border-solid border-gray-300 pl-4">
                            {d.votedPolls}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default UserListTable
