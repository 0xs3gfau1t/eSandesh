export default function ({ queryChange, cancel, reset, query}) {
    return (
        <div className="w-1/2 ml-auto mr-4 absolute right-0 bg-slate-300 border rounded-lg px-3 py-2 text-center">
            <div className="flex justify-between mt-1 items-center">
                <label htmlFor="dateFrom">Date From: </label>
                <input
                    name="dateFrom"
                    type="date"
                    onChange={queryChange}
                    value={query.dateFrom}
                    className="bg-inherit border border-slate-600 px-2 py-1 rounded-lg"
                />
            </div>
            <div className="flex justify-between mt-1 items-center">
                <label htmlFor="dateFrom">Date To: </label>
                <input
                    name="dateTo"
                    type="date"
                    onChange={queryChange}
                    value={query.dateTo}
                    className="bg-inherit border border-slate-600 px-2 py-1 rounded-lg"
                />
            </div>
            <div className="flex justify-between mt-1 items-center">
                <label htmlFor="dateFrom">Author: </label>
                <input
                    name="author"
                    type="text"
                    onChange={queryChange}
                    className="bg-inherit border border-slate-600 px-2 py-1 rounded-lg"
                    value={query.author}
                />
            </div>
            <div className="flex justify-between mt-1 items-center">
                <label htmlFor="dateTo">Categories</label>
                <input
                    name="category"
                    type="text"
                    onChange={queryChange}
                    value={query.category}
                    className="bg-inherit border border-slate-600 px-2 py-1 rounded-lg"
                />
            </div>
            <button onClick={cancel}>Cancel</button>
            <button onClick={reset}>Reset Filters</button>
        </div>
    )
}
