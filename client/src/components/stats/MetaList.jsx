import {
    AiOutlineCheck,
    AiOutlineDelete,
    AiOutlineDownload,
    AiOutlineReload,
} from 'react-icons/ai'
import { TbReport } from 'react-icons/tb'
import { useDispatch, useSelector } from 'react-redux'
import { loadMoreStats, reloadStats } from '../../redux/actions/stats'
import { statActions } from '../../redux/reducers/stats'
import { getRelativeTime } from '../../utils/relativeDuration'

/**
 * @param {Object} obj
 * @param {{_id: string, createdAt: string}[]} obj.data
 */
const MetaList = () => {
    const dispatch = useDispatch()

    const loadMore = () => dispatch(loadMoreStats('meta'))
    const reload = () => dispatch(reloadStats('meta'))
    const openGenerate = () => dispatch(statActions.setGenerate('show'))

    const activeMeta = useSelector(state => state.stats.activeMetaIdx)
    const data = useSelector(state => state.stats.meta.data)

    return (
        <div className="border-solid border-black border flex flex-col items-center rounded-lg bg-slate-200">
            <div className="h-16 w-full relative flex justify-center items-center">
                <h2 className="font-bold">Meta List</h2>
                <div className="px-2 absolute right-2 top-4 bottom-4 flex gap-2 items-center justify-center">
                    <div
                        className="flex flex-col items-center rounded-md hover:shadow-sm cursor-pointer"
                        onClick={openGenerate}
                    >
                        <TbReport className="h-6 w-6 p-1 cursor-pointer" />
                        <span className="text-sm font-extralight">
                            Generate
                        </span>
                    </div>
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
                        <span className="text-sm font-extralight">Reload</span>
                    </div>
                </div>
            </div>
            <div className="h-[calc(100%-4rem)] overflow-y-auto w-full px-2">
                <table className="w-full border-collapse rounded-sm">
                    <thead className="">
                        <tr className="text-black">
                            <th className="sticky top-0 bg-slate-300 rounded-tl-md">
                                Id
                            </th>
                            <th className="sticky top-0 bg-slate-300">
                                Created
                            </th>
                            <th className="sticky top-0 bg-slate-300 rounded-tr-md">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-slate-200">
                        {data.map((d, idx) => (
                            <tr
                                key={d._id}
                                className="border-b border-solid border-gray-300 border-opacity-100"
                            >
                                <td
                                    className="border-x border-solid border-gray-300 truncate max-w-[4rem] pl-4"
                                    title={d._id}
                                >
                                    {d._id}
                                </td>
                                <td className="border-x border-solid border-gray-300 pl-4">
                                    {getRelativeTime(d.createdAt)}
                                </td>
                                <td className="border-x border-solid border-gray-300 flex">
                                    <div className="px-2 bottom-4 flex w-full gap-2 items-center justify-around p-1">
                                        <AiOutlineCheck
                                            className={`h-4 w-4 cursor-pointer ${idx == activeMeta
                                                    ? 'text-green-500'
                                                    : ''
                                                }`}
                                            title="Load"
                                            onClick={() =>
                                                dispatch(
                                                    statActions.setActiveMeta(
                                                        idx
                                                    )
                                                )
                                            }
                                        />
                                        <AiOutlineDelete
                                            className="h-4 w-4 cursor-pointer"
                                            title="Delete"
                                            onClick={() =>
                                                dispatch(
                                                    statActions.setDeletion(
                                                        d._id
                                                    )
                                                )
                                            }
                                        />
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default MetaList
