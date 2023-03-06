import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
    listCommentsByArticle,
    dltComments,
    addComments,
    editComments,
    addSubComments,
    addLikes,
} from '../redux/actions/comments'
import { Link } from 'react-router-dom'
import { FaUserCircle } from 'react-icons/fa'
import { MdModeEditOutline, MdDelete } from 'react-icons/md'
import { BiLike, BiReply, BiChat } from 'react-icons/bi'

const initialValue = {
    txtvalue: '',
    a: 1,
    editting: false,
    comId: '',
    sub: false,
    page: 0,
    items: 10,
}

function Comments(props) {
    const comments = useSelector(state => state.comments.comments)
    const dispatch = useDispatch()
    const [value, setValue] = useState(initialValue)

    useEffect(() => {
        dispatch(
            listCommentsByArticle({
                articleId: props.articleId,
                page: value.page,
                items: value.items,
            })
        )
    }, [value.a])

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
        dispatch(
            addComments({ articleId: props.articleId, content: value.txtvalue })
        )
        setValue({ ...value, txtvalue: '', a: value.a + 1 })
    }

    const handleDltCmnt = cmnt => {
        dispatch(dltComments({ commentId: cmnt._id }))
        setValue({ ...value, a: value.a + 1 })
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

    const handleLikeCmnt = cmnt => {
        dispatch(addLikes({ id: cmnt._id }))
    }

    return (
        <div>
            {comments &&
                comments.comments?.map(comment => {
                    if (comment.article === props.articleId) {
                        return (
                            <div
                                key={comment._id}
                                className="flex flex-row p-4 box-border border-4"
                            >
                                <div className="pr-2">
                                    <Link to="userProfie">
                                        <FaUserCircle className="text-5xl" />
                                    </Link>
                                </div>
                                <div className="w-full">
                                    <div className="flex justify-between">
                                        <span className=" justify-start text-sm font-medium">
                                            {comment.user.slice(0, 10)}
                                        </span>
                                        <div className="flex justify-end w-full space-x-2">
                                            <span className="text-xs">
                                                {comment.createdAt.slice(0, 10)}
                                            </span>
                                            <span
                                                onClick={() =>
                                                    handleEditComment(comment)
                                                }
                                                className="cursor-pointer transition-all duration-200 hover:text-orange-500"
                                            >
                                                <MdModeEditOutline />
                                            </span>
                                            <span
                                                onClick={() =>
                                                    handleDltCmnt(comment)
                                                }
                                                className="cursor-pointer transition-all duration-200 hover:text-rose-500 "
                                            >
                                                <MdDelete />
                                            </span>
                                        </div>
                                    </div>
                                    <div>
                                        <p>{comment.content}</p>
                                        <div className="flex justify-between w-full gap-2">
                                            <span
                                                onClick={() =>
                                                    handleLikeCmnt(comment)
                                                }
                                                className="flex items-end content-center cursor-pointer transition-all duration-200 hover:text-green-500"
                                            >
                                                <BiLike />
                                                <span className="text-xs">
                                                    {comment.likes}
                                                </span>
                                            </span>
                                            <span
                                                onClick={() =>
                                                    handleSubCmnt(comment)
                                                }
                                                className="flex items-end cursor-pointer  transition-all duration-200 hover:text-orange-500"
                                            >
                                                <BiReply />
                                            </span>
                                            <span className="flex items-end cursor-pointer transition-all duration-200 hover:text-sky-500 ">
                                                <BiChat />
                                                <span className="text-xs">
                                                    {comment.subComments.length}
                                                </span>
                                            </span>
                                        </div>
                                    </div>
                                    {/* <div className=''>
                                    {comments.subComments?.map(comment=>{

                                    })}
                                </div> */}
                                </div>
                            </div>
                        )
                    }
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
