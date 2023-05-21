import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BsCalendar2Check, BsTrashFill } from 'react-icons/bs'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { setAlert } from '../../redux/actions/misc'

const readerState = Object.freeze({
    REPORTER: 'Reporter',
    NORMALUSER: 'Normal User',
})

//
// Global State ma rakhina
// Jhyau laxa
//
export default function ReaderArticles() {
    const [data, setData] = useState([])
    const [state, setState] = useState(readerState.REPORTER)

    const dispatch = useDispatch()
    const onSubmit = () => {
        const params = {}
        if (state === readerState.NORMALUSER) params['normalUser'] = true

        axios
            .get('/api/article/topublish', {
                withCredentials: true,
                params,
            })
            .then(res => setData(res.data.articles))
    }

    useEffect(() => {
        onSubmit()
    }, [state])

    const approve = id => {
        axios
            .post('/api/article/publish', { id }, { withCredentials: true })
            .then(() => {
                setData(oldData => oldData.filter(d => d._id != id))
                dispatch(setAlert('Published', 'success'))
            })
            .catch(e => {
                dispatch(setAlert('Cannot publish', 'danger'))
            })
    }

    const disapprove = id => {
        axios
            .delete('/api/article', { withCredentials: true, params: { id } })
            .then(() => {
                setData(oldData => oldData.filter(d => d._id != id))
                dispatch(setAlert('Disapproved', 'success'))
            })
            .catch(e => {
                dispatch(setAlert('Falied disapproval', 'danger'))
            })
    }

    return (
        <>
            <div className="flex flex-col">
                <div className="overflow-x-auto sm:-px-6 lg:-px-8">
                    <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                        <div
                            className="px-5 py-2 justify-center items-center flex space-x-32"
                            id="state-container"
                        >
                            <button
                                className={`px-3 py-1 ${
                                    state === readerState.REPORTER
                                        ? 'bg-emerald-500'
                                        : ''
                                } hover:bg-emerald-600 `}
                                onClick={() => setState(readerState.REPORTER)}
                            >
                                {readerState.REPORTER}{' '}
                            </button>
                            <button
                                className={`px-3 py-1 ${
                                    state === readerState.NORMALUSER
                                        ? 'bg-emerald-500'
                                        : ''
                                } hover:bg-emerald-600 `}
                                onClick={() => setState(readerState.NORMALUSER)}
                            >
                                {readerState.NORMALUSER}
                            </button>
                        </div>

                        <div className="overflow-hidden">
                            <table className="newsListTable min-w-full table-auto">
                                <thead className="border-b">
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Title</th>
                                        <th scope="col">Author</th>
                                        <th scope="col">Date Modified</th>
                                        <th scope="col">Approve</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data?.map((article, idx) => (
                                        <tr
                                            key={article._id}
                                            className="border-b"
                                        >
                                            <td>{idx + 1}</td>
                                            <td className="truncate">
                                                <Link
                                                    to={`/news/${article.year}/${article.month}/${article.slug}`}
                                                    target="_blank"
                                                >
                                                    {article?.title
                                                        ? article.title
                                                        : ''}
                                                </Link>
                                            </td>
                                            <td>{article.userInfo.name}</td>
                                            <td>
                                                {new Date(
                                                    article.updatedAt
                                                ).toLocaleString()}
                                            </td>
                                            <td className="flex flex-row gap-x-3">
                                                <BsCalendar2Check
                                                    onClick={() => {
                                                        approve(article._id)
                                                    }}
                                                    className="cursor-pointer hover:fill-green-500 text-2xl"
                                                />
                                                <BsTrashFill
                                                    onClick={() => {
                                                        disapprove(article._id)
                                                    }}
                                                    className="cursor-pointer hover:fill-rose-500 text-2xl"
                                                />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
