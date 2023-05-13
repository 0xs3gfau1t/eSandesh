import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BsFillPlusSquareFill } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import { GiSettingsKnobs } from 'react-icons/gi'
import { AiOutlineSearch } from 'react-icons/ai'

import { listNews } from '../../redux/actions/dashNews'
import { DashActions } from '../../components/common'
import Filter from '../../components/common/Filter'

const initQueryParams = {
    title: '',
    dateFrom: undefined, // 180 default returned
    dateTo: undefined, // Upto today
    author: '',
    limit: 10,
    page: 0,
    category: '',
}

const ManageNews = () => {
    const news = useSelector(state => state.news.newsList)
    const dispatch = useDispatch()
    const [queryParams, setQueryParams] = useState(initQueryParams)
    const [filterDisplay, setFilterDisplay] = useState(false)

    function onSubmit() {
        dispatch(listNews(queryParams))
    }

    useEffect(() => {
        onSubmit()
    }, [queryParams])

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
        <>
            <Link to="/admin/dashboard/addNews" className="addNew">
                <BsFillPlusSquareFill className="ml-4 text-[1.8rem] " />
                <h2>Create news</h2>
            </Link>
            <div
                className="flex flex-col justify-items-center relative"
                id="setting-container"
            >
                <div id="search-bar" className='ml-32'>
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
            <div className="flex flex-col">
                <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                        <div className="overflow-hidden">
                            <table className="newsListTable min-w-full table-auto">
                                <thead className="border-b">
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Title</th>
                                        <th scope="col">Date Modified</th>
                                        <th scope="col">Hits</th>
                                        <th scope="col">Categories</th>
                                        <th scope="col">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {news[queryParams.page] &&
                                        Object.keys(news[queryParams.page]).map(
                                            nws => {
                                                let khabar =
                                                    news[queryParams.page][nws]
                                                return (
                                                    <tr
                                                        key={nws}
                                                        className="border-b"
                                                    >
                                                        <td>
                                                            {parseInt(nws) + 1}
                                                        </td>
                                                        <td className="truncate">
                                                            <Link
                                                                to={`/news/${khabar.year}/${khabar.month}/${khabar.slug}`}
                                                                target="_blank"
                                                            >
                                                                {khabar.title
                                                                    ? khabar.title
                                                                    : ''}
                                                            </Link>
                                                        </td>
                                                        <td>
                                                            {new Date(
                                                                khabar.updatedAt
                                                            ).toLocaleDateString()}
                                                        </td>
                                                        <td>{khabar.hits}</td>
                                                        <td>
                                                            {khabar.category
                                                                ? khabar.category.join(
                                                                      ','
                                                                  )
                                                                : ''}
                                                        </td>
                                                        <td>
                                                            <DashActions
                                                                year={
                                                                    khabar.year
                                                                }
                                                                month={
                                                                    khabar.month
                                                                }
                                                                slug={
                                                                    khabar.slug
                                                                }
                                                                id={khabar._id}
                                                                page={
                                                                    queryParams.page
                                                                }
                                                            />
                                                        </td>
                                                    </tr>
                                                )
                                            }
                                        )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ManageNews
