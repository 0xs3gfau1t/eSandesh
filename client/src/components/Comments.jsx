import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
    listCommentsByArticle,
    dltComments,
    addComments,
    editComments,
    addSubComments,
    likeComment,
} from '../redux/actions/comments'
import { useSession } from 'next-auth/react'
import { FaUserCircle } from 'react-icons/fa'
import {
    AiFillEdit,
    AiFillDelete,
    AiOutlineLike,
    AiFillLike,
} from 'react-icons/ai'
import { BiReply, BiChat } from 'react-icons/bi'

const initialValue = {
    txtvalue: '',
    editting: false,
    comId: '',
    sub: false,
    page: 0,
    items: 10,
}

function Comments({ articleId }) {
    const comments = useSelector(state => state.comments.comments)
    const dispatch = useDispatch()
    const [value, setValue] = useState(initialValue)

    useEffect(() => {
        if (articleId)
            dispatch(
                listCommentsByArticle({
                    articleId,
                    page: value.page,
                    items: value.items,
                })
            )
    }, [articleId])

    const handleSubmit = e => {
        e.preventDefault()
        if (value.editting) {
            dispatch(
                editComments({
                    commentId: value.comId,
                    content: value.txtvalue,
                })
            )
            setValue({
                ...value,
                txtvalue: '',
                a: value.a + 1,
                editting: false,
            })
            return
        }
        if (value.sub) {
            console.log(value.comId)
            dispatch(
                addSubComments({
                    content: value.txtvalue,
                    commentId: value.comId,
                })
            )
            setValue({ ...value, txtvalue: '', a: value.a + 1, sub: false })
            return
        }
        dispatch(addComments({ articleId, content: value.txtvalue }))
        setValue({ ...value, txtvalue: '', a: value.a + 1 })
    }

    const handleChange = e => {
        setValue({ ...value, txtvalue: e.target.value })
    }

    const handleSubCmnt = cmnt => {
        setValue({ ...value, sub: true })
    }

    const handleEditComment = cmnt => {
        setValue({
            ...value,
            txtvalue: cmnt.content,
            editting: true,
            comId: cmnt._id,
        })
    }

    const session = useSession()
    const formatter = new Intl.NumberFormat('en-US', { notation: 'compact' })

    return (
        <div>
            {comments?.map(c => {
                return (
                    <div
                        key={c.id}
                        className="flex flex-row p-4 box-border border-4"
                    >
                        <div className="pr-2">
                            {c.user?.image ? (
                                <img
                                    src={c.user.image}
                                    className="w-8 h-8 rounded-full"
                                />
                            ) : (
                                <FaUserCircle className="text-5xl w-8 h-8 rounded-full" />
                            )}
                        </div>
                        <div className="w-full">
                            <div className="flex justify-between">
                                <span className=" justify-start text-sm font-medium">
                                    {c.user.name}
                                </span>
                                <div className="flex justify-end w-full space-x-2">
                                    <span className="text-xs">
                                        {c.createdAt.slice(0, 10)}
                                    </span>
                                    {c.user.id == session.data?.user?.id && (
                                        <>
                                            <AiFillEdit
                                                onClick={() =>
                                                    handleEditComment(c)
                                                }
                                                className="cursor-pointer transition-all duration-200 hover:text-orange-500"
                                            />
                                            <AiFillDelete
                                                className="cursor-pointer transition-all duration-200 hover:text-rose-500 "
                                                onClick={() =>
                                                    dispatch(
                                                        dltComments({
                                                            id: c.id,
                                                        })
                                                    )
                                                }
                                            />
                                        </>
                                    )}
                                </div>
                            </div>
                            <div>
                                <p>{c.content}</p>
                                <div className="flex justify-between w-full gap-2">
                                    <span
                                        onClick={() =>
                                            dispatch(likeComment({ id: c.id }))
                                        }
                                        className="flex items-end justify-center gap-1 content-center cursor-pointer transition-all duration-200 hover:text-green-500"
                                    >
                                        {c.liked ? (
                                            <AiFillLike className="" />
                                        ) : (
                                            <AiOutlineLike />
                                        )}
                                        <span className="text-xs">
                                            {formatter.format(c.likes)}
                                        </span>
                                    </span>
                                    <span
                                        onClick={() => handleSubCmnt(c)}
                                        className="flex items-end cursor-pointer  transition-all duration-200 hover:text-orange-500"
                                    >
                                        <BiReply />
                                    </span>
                                    <span
                                        className="flex items-end justify-center gap-1 content-center cursor-pointer transition-all duration-200 hover:text-sky-500 "
                                        title={
                                            c.subComments.length
                                                ? 'View Replies'
                                                : 'No Replies'
                                        }
                                    >
                                        <BiChat />
                                        <span className="text-xs">
                                            {c.subComments.length}
                                        </span>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })}
            <div className="w-full">
                <form onSubmit={handleSubmit}>
                    <input
                        className="placeholder:italic placeholder:text-slate-400 bg-white w-64 border border-slate-300 rounded-md py-2  px-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                        type="text"
                        value={value.txtvalue}
                        onChange={handleChange}
                        placeholder="Type your Comment"
                    />
                    <input
                        className="w-32 text-sm cursor-pointer text-slate-900  py-2 px-2 rounded-full border-0 font-semibold transition-all duration-200 bg-white  hover:bg-slate-200"
                        type="submit"
                        value="Submit"
                    />
                </form>
            </div>
        </div>
    )
}

export default Comments
