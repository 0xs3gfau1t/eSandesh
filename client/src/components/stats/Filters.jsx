import { useDispatch, useSelector } from 'react-redux'
import { statActions } from '../../redux/reducers/stats'

const StatFilters = ({ type }) => {
    const filters = useSelector(state => state.stats[type].filter)
    const dispatch = useDispatch()

    return (
        <div className="px-2 absolute right-2 top-4 bottom-4 flex gap-2 items-center justify-center">
            {filters?.dateFrom != undefined && (
                <div className="flex flex-row gap-1 items-center rounded-md hover:shadow-sm cursor-pointer">
                    <span className="text-sm font-extralight">From:</span>
                    <input
                        className="focus:outline-none bg-transparent"
                        type="date"
                        value={filters.dateFrom}
                        onChange={e =>
                            dispatch(
                                statActions.setFromDate({
                                    value: e.target.value,
                                    type,
                                })
                            )
                        }
                    />
                </div>
            )}
            {filters?.dateTo != undefined && (
                <div className="flex flex-row gap-1 items-center rounded-md hover:shadow-sm cursor-pointer">
                    <span className="text-sm font-extralight">To:</span>
                    <input
                        className="focus:outline-none bg-transparent"
                        type="date"
                        value={filters.dateTo}
                        onChange={e =>
                            dispatch(
                                statActions.setToDate({
                                    value: e.target.value,
                                    type,
                                })
                            )
                        }
                    />
                </div>
            )}
        </div>
    )
}

export default StatFilters
