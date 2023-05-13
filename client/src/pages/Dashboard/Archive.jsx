import React, { useEffect, useState } from 'react'
import { AiOutlineSearch } from 'react-icons/ai'
import { GiSettingsKnobs } from 'react-icons/gi'
import { useDispatch, useSelector } from 'react-redux'
import Filter from '../../components/common/Filter'
import { listArchive, convertToArchive } from '../../redux/actions/archive'
import { listNews } from '../../redux/actions/dashNews'
import ArchiveCard from '../../components/common/ArchiveCard'
import { PaginationComponent } from '../../components/common'

const archiveState = {
    ARCHIVABLE: 'Archivable',
    ARCHIVED: 'Archived',
}

const initQueryParams = {
    title: '',
    dateFrom: undefined, // 180 default returned
    dateTo: undefined, // Upto today
    author: '',
    limit: 10,
    page: 0,
    category: '',
}

export default function Archive() {
    const [state, setState] = useState(archiveState.ARCHIVED)
    const [queryParams, setQueryParams] = useState(initQueryParams)
    const archives = useSelector(state => state.archive.archiveList)
    const articles = useSelector(state => state.news.newsList)
    const [filterDisplay, setFilterDisplay] = useState(false)

    const dispatch = useDispatch()

    useEffect(() => {
        onSubmit()
    }, [queryParams, state])

    function onSubmit() {
        console.log(state)
        if (state === archiveState.ARCHIVABLE) dispatch(listNews(queryParams))
        else dispatch(listArchive(queryParams))
    }

    function queryChange(e) {
        setQueryParams({
            ...queryParams,
            [e.target.name]:
                e.target.name === 'category'
                    ? String(e.target.value).toUpperCase()
                    : e.target.value,
        })
    }

    return (
        <div
            className="flex flex-col justify-items-center ml-32"
            id="setting-container"
        >
            <div
                className="px-5 py-2 justify-center items-center flex space-x-32"
                id="state-container"
            >
                <button
                    className={`px-3 py-1 ${
                        state === archiveState.ARCHIVABLE
                            ? 'bg-emerald-500'
                            : ''
                    } hover:bg-emerald-600 `}
                    onClick={() => setState(archiveState.ARCHIVABLE)}
                >
                    {archiveState.ARCHIVABLE}
                </button>
                <button
                    className={`px-3 py-1 ${
                        state === archiveState.ARCHIVED ? 'bg-emerald-500' : ''
                    } hover:bg-emerald-600 `}
                    onClick={() => setState(archiveState.ARCHIVED)}
                >
                    {archiveState.ARCHIVED}
                </button>
            </div>
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
                            reset={() => setQueryParams(initQueryParams)}
                            query={queryParams}
                        />
                    )}
                </div>
            </div>
            <div id="result-container" className='ml-6'>
                <ul>
                    {state === archiveState.ARCHIVED
                        ? archives?.map(archive => (
                              <li>
                                  <ArchiveCard
                                      archive={archive}
                                      key={archive.title}
                                  />
                              </li>
                          ))
                        : articles[queryParams.page]?.map(archive => (
                              <li>
                                  <ArchiveCard
                                      archive={archive}
                                      key={archive.title}
                                      convertToArchive={() => {
                                          console.log(archive._id)
                                          dispatch(
                                              convertToArchive(archive._id)
                                          )
                                      }}
                                  />
                              </li>
                          ))}
                </ul>
            </div>
            <PaginationComponent
                page={queryParams.page}
                setPage={page => setQueryParams({ ...queryParams, page })}
            />
        </div>
    )
}
