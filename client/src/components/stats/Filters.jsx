import { useDispatch, useSelector } from 'react-redux'
import { statActions } from '../../redux/reducers/stats'

const StatFilters = () => {
    const filters = useSelector(state => state.stats[state.stats.active].filter)
    const dispatch = useDispatch()

    return (
        <div className="px-2 absolute right-2 top-4 bottom-4 flex gap-2 items-center justify-center">
            {filters?.dateFrom != undefined && (
                <div className="flex flex-col items-center rounded-md hover:shadow-sm cursor-pointer">
                    <input
                        className="focus:outline-none"
                        type="date"
                        value={filters.dateFrom}
                        onChange={e =>
                            dispatch(statActions.setFromDate(e.target.value))
                        }
                    />
                    <span className="text-sm font-extralight">From</span>
                </div>
            )}
            {filters?.dateTo != undefined && (
                <div className="flex flex-col items-center rounded-md hover:shadow-sm cursor-pointer">
                    <input
                        className="focus:outline-none"
                        type="date"
                        value={filters.dateTo}
                        onChange={e =>
                            dispatch(statActions.setToDate(e.target.value))
                        }
                    />
                    <span className="text-sm font-extralight">To</span>
                </div>
            )}
        </div>
    )
}

export default StatFilters
