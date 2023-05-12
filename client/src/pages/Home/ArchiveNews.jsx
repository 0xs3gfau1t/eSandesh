import React, { useEffect, useRef } from 'react'
import { useState } from 'react'
import ArchiveCard from '../../components/common/ArchiveCard'
import Filter from '../../components/common/Filter'
import { AiOutlineSearch } from 'react-icons/ai'
import { GiSettingsKnobs } from 'react-icons/gi'
import { useDispatch, useSelector } from 'react-redux'
import { listArchive } from '../../redux/actions/archive'

const initQueryParams = {
    title: '',
    dateFrom: undefined, // 180 default returned
    dateTo: undefined, // Upto today
    createdBy: '',
    limit: 10,
    page: 0,
    categories: [],
}

export default function Archive() {
    const [queryParams, setQueryParams] = useState(initQueryParams)
    const [filterDisplay, setFilterDisplay] = useState(false)
    const archiveList = useSelector(state => state.archive.archiveList)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(listArchive(queryParams))
    }, [queryParams])

    function onSubmit(e) {
        e.preventDefault()
        dispatch(listArchive(queryParams))
    }

    function queryChange(e) {
        setQueryParams({ ...queryParams, [e.target.name]: e.target.value })
    }

    return (
        <>
            <h1 className="text-center text-3xl">अभिलेख</h1>
            <div
                className="flex flex-col justify-items-center relative"
                id="setting-container"
            >
                <div id="search-bar">
                    <div className="mr-4">
                        <form
                            className={`mt-1 flex border rounded-md border-solid border-black shadow-sm focus-within:shadow-md`}
                            onSubmit={onSubmit}
                        >
                            <input
                                type="text"
                                name="title"
                                value={queryParams.title}
                                onChange={queryChange}
                                className="w-full bg-transparent border-slate-400 px-2 focus:outline-none rounded-md placeholder:indent-2 text-center"
                                placeholder="किवर्ड द्वारा खोज्नुहोस्"
                            />
                            <GiSettingsKnobs
                                className="h-10 w-10 text-black px-2 rounded-md block hover:scale-110"
                                onClick={() => {
                                    setFilterDisplay(!filterDisplay)
                                }}
                            />
                            <AiOutlineSearch
                                name="title"
                                className="h-10 w-10 text-black px-2 rounded-md block hover:scale-110 hover:cursor-pointer"
                                onChange={queryChange}
                                onClick={onSubmit}
                            />
                        </form>
                    </div>
                    {filterDisplay && (
                        <Filter
                            queryChange={queryChange}
                            cancel={() => setFilterDisplay(!filterDisplay)}
                            reset={()=>setQueryParams(initQueryParams)}
                            query={queryParams}
                        />
                    )}
                </div>
            </div>
            <div id="result-container">
                <ul>
                    {archiveList.map(archive => (
                        <ArchiveCard archive={archive} />
                    ))}
                </ul>
            </div>
        </>
    )
}
