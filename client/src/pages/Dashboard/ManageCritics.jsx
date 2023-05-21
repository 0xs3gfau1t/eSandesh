import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AiFillCheckCircle, AiFillDelete } from 'react-icons/ai'
import PaginationComponent from '../../components/common/PaginationComponent'

import {
    listCritics,
    listToApproveCritics,
    approveCritic,
    rejectCritic,
} from '../../redux/actions/critics'
import { Link } from 'react-router-dom'

const criticState = Object.freeze({
    APPROVED: 'Approved',
    TOAPPROVE: 'To Approve',
})

export default function () {
    const [state, setState] = useState(criticState.TOAPPROVE)
    const [params, setParams] = useState({
        limit: 10,
        page: 0,
    })
    const approvedCritics = useSelector(state => state.critics.approved)
    const toApproveCritics = useSelector(state => state.critics.toApprove)

    const dispatch = useDispatch()

    const onSubmit = () => {
        if (state === criticState.APPROVED) dispatch(listCritics(params))
        else dispatch(listToApproveCritics(params))
    }
    useEffect(() => {
        onSubmit()
    }, [state, params])

    function onChange(e) {
        setParams({ ...params, [e.target.name]: e.target.value })
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
                                    state === criticState.APPROVED
                                        ? 'bg-emerald-500'
                                        : ''
                                } hover:bg-emerald-600 `}
                                onClick={() => setState(criticState.APPROVED)}
                            >
                                {criticState.APPROVED}
                            </button>
                            <button
                                className={`px-3 py-1 ${
                                    state === criticState.TOAPPROVE
                                        ? 'bg-emerald-500'
                                        : ''
                                } hover:bg-emerald-600 `}
                                onClick={() => setState(criticState.TOAPPROVE)}
                            >
                                {criticState.TOAPPROVE}
                            </button>
                        </div>
                        <div className="overflow-hidden">
                            <table className="newsListTable min-w-full table-auto">
                                <thead className="border-b">
                                    <tr>
                                        <th scope="col">News Title</th>
                                        <th scope="col">Critic Name</th>
                                        <th scope="col">Likes</th>
                                        <th scope="col">Categories</th>
                                        <th scope="col">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="text-xl">
                                    {state === criticState.APPROVED
                                        ? approvedCritics.map(critic => (
                                              <tr key={critic.publishedAt}>
                                                  <td className="truncate">
                                                      <Link
                                                          to={`/news/${critic.articleInfo.year}/${critic.articleInfo.month}/${critic.articleInfo.slug}`}
                                                          target="_blank"
                                                      >
                                                          {
                                                              critic.articleInfo
                                                                  .title
                                                          }
                                                      </Link>
                                                  </td>
                                                  <td>
                                                      {
                                                          critic.commentUserInfo
                                                              .name
                                                      }
                                                  </td>
                                                  <td>
                                                      {
                                                          critic.commentInfo
                                                              .likeCount
                                                      }
                                                  </td>
                                                  <td>
                                                      {critic.articleInfo.category.join(
                                                          ', '
                                                      )}
                                                  </td>
                                                  <td>
                                                      <div className="hover:cursor-pointer">
                                                          <AiFillDelete
                                                              onClick={() =>
                                                                  dispatch(
                                                                      rejectCritic(
                                                                          critic._id
                                                                      )
                                                                  )
                                                              }
                                                              className="text-3xl hover:fill-rose-900 hover:scale-125 duration-300"
                                                          />
                                                      </div>
                                                  </td>
                                              </tr>
                                          ))
                                        : toApproveCritics.map(critic => (
                                              <tr key={critic.commentInfo._id}>
                                                  <td className="truncate">
                                                      <Link
                                                          to={`/news/${critic.articleInfo.year}/${critic.articleInfo.month}/${critic.articleInfo.slug}`}
                                                          target="_blank"
                                                      >
                                                          {
                                                              critic.articleInfo
                                                                  .title
                                                          }
                                                      </Link>
                                                  </td>
                                                  <td>
                                                      {
                                                          critic.commentUserInfo
                                                              .name
                                                      }
                                                  </td>
                                                  <td>
                                                      {
                                                          critic.commentInfo
                                                              .likeCount
                                                      }
                                                  </td>
                                                  <td>
                                                      {critic.articleInfo.category.join(
                                                          ', '
                                                      )}
                                                  </td>
                                                  <td>
                                                      <div className="hover:cursor-pointer flex gap-x-5 flex-row text-2xl w-min">
                                                          <AiFillCheckCircle
                                                              className="hover:fill-green-900 hover:scale-125 duration-300"
                                                              onClick={() =>
                                                                  dispatch(
                                                                      approveCritic(
                                                                          {
                                                                              criticId:
                                                                                  critic
                                                                                      .commentInfo
                                                                                      ._id,
                                                                          }
                                                                      )
                                                                  )
                                                              }
                                                          />
                                                          <AiFillDelete
                                                              className="hover:fill-rose-900 hover:scale-125 duration-300"
                                                              onClick={() =>
                                                                  dispatch(
                                                                      rejectCritic(
                                                                          {
                                                                              criticId:
                                                                                  critic
                                                                                      .commentInfo
                                                                                      ._id,
                                                                          }
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
                        <PaginationComponent
                            page={params.page}
                            setPage={newPage =>
                                setParams({ ...params, page: newPage })
                            }
                        />
                    </div>
                </div>
            </div>
        </>
    )
}
