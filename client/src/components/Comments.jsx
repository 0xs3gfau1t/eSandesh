import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
    listCommentsByArticle,
    dltComments,
    addComments,
    editComments,
    likeComment,
} from '../redux/actions/comments'

import {
    AiOutlineEdit,
    AiOutlineLike,
    AiFillLike,
    AiOutlineUser,
    AiOutlineDelete,
} from 'react-icons/ai'
import { BiComment, BiCommentAdd } from 'react-icons/bi'
import { MdSend } from 'react-icons/md'

import { getRelativeTime } from '../utils/relativeDuration'
import { setAlert } from '../redux/actions/misc'

const formatter = new Intl.NumberFormat('en-US', { notation: 'compact' })

const AddCommentBox = ({ value, onChange, onSubmit, onCancel }) => {
    return (
        <form
            className="bg-white border border-gray-300 rounded-md "
            onSubmit={onSubmit}
        >
            <textarea
                className="bg-transparent w-full rounded-md pt-2 px-3 border border-gray-300 focus:outline-none text-sm text-black placeholder:gray-500 placeholder:text-xl"
                onKeyDown={e => {
                    if (e.key === 'Enter' && e.ctrlKey) onSubmit(e)
                    else if (e.key === 'Escape') onCancel()
                }}
                rows={4}
                required={true}
                value={value}
                onChange={onChange}
                placeholder="आफ्नो विचार लेख्नुहोस्"
            />
            <div className="flex justify-end place-items-center">
                <button
                    type="button"
                    onClick={onCancel}
                    className="ml-2 px-4 h-9 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 focus:outline-none"
                >
                    Cancel
                </button>
                <button type="submit">
                    <MdSend size={30} className="text-blue-800 text-4xl" />
                </button>
            </div>
        </form>
    )
}

const CommentBox = ({
    cmnt,
    path,
    editing,
    setEditing,
    replying,
    setReplying,
    currentUser,
    articleId,
}) => {
    const dispatch = useDispatch()

    const Like = () => dispatch(likeComment({ id: cmnt._id, path }))
    const Delete = () => dispatch(dltComments({ id: cmnt._id, path }))

    const StartEditing = () =>
        setEditing({ id: cmnt._id, commentStr: cmnt.content })
    const ChangeEditing = e =>
        setEditing(o => ({ id: o.id, commentStr: e.target.value }))
    const CancelEditing = () => setEditing({ id: -1, commentStr: '' })
    const SubmitEditing = e => {
        e.preventDefault()
        dispatch(
            editComments({
                id: cmnt._id,
                content: editing.commentStr,
                path,
            })
        )
        setEditing({ id: -1, commentStr: '' })
    }

    const StartReplying = () => setReplying({ id: cmnt._id, commentStr: '' })
    const ChangeReplying = e =>
        setReplying(o => ({ id: o.id, commentStr: e.target.value }))
    const CancelReplying = () => setReplying({ id: -1, commentStr: '' })
    const SubmitReplying = e => {
        e.preventDefault()
        dispatch(
            addComments({
                articleId,
                content: replying.commentStr,
                parentComment: replying.id,
                path,
                currentUser,
            })
        )
        setReplying({ id: -1, commentStr: '' })
    }

    const [hover, setHover] = useState(false)

    return (
        <div className="grid grid-cols-[2rem,auto] grid-rows-[2rem,auto] gap-y-1 gap-x-1 ">
            {cmnt.user?.image ? (
                <img src={cmnt.user.image} className="w-8 h-8 rounded-full" />
            ) : (
                <AiOutlineUser className="text-5xl w-full h-full border-b border-solid border-black rounded-full" />
            )}
            <div className="flex gap-2 items-center relative">
                <span>{cmnt.user.name}</span>
                <span className="text-sm text-slate-500">
                    <span
                        onMouseEnter={() => setHover(true)}
                        onMouseLeave={() => setHover(false)}
                        className="cursor-pointer"
                    >
                        {cmnt.revisions.length ? `Edited ` : 'Created '}
                    </span>
                    <span title={new Date(cmnt.updatedAt)}>
                        {getRelativeTime(new Date(cmnt.updatedAt))}
                    </span>
                    {cmnt.revisions.length > 0 && hover && (
                        <div
                            className="absolute bottom-full p-2 rounded-md bg-slate-200 border-solid border-slate-400 border"
                            onMouseEnter={() => setHover(true)}
                            onMouseLeave={() => setHover(false)}
                        >
                            {cmnt.revisions.map(r => (
                                <div className="flex flex-col border-b border-solid border-slate-300 justify-center p-1">
                                    <span className="text-slate-800 text-justify">
                                        {r.content}
                                    </span>
                                    <span className="text-slate-500">
                                        {getRelativeTime(new Date(r.timestamp))}
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}
                </span>
            </div>
            <div className="w-1/2 block border-solid border-r-2 border-slate-300" />
            <div className="flex flex-col gap-2">
                <div>
                    {editing.id == cmnt._id ? (
                        <AddCommentBox
                            value={editing.commentStr}
                            onChange={ChangeEditing}
                            onCancel={CancelEditing}
                            onSubmit={SubmitEditing}
                        />
                    ) : (
                        <>
                            <span>{cmnt.content}</span>
                        </>
                    )}
                </div>
                <div className="flex gap-2">
                    <div>
                        {cmnt.liked ? (
                            <AiFillLike
                                className="cursor-pointer hover:text-rose-400 inline mr-1"
                                onClick={Like}
                            />
                        ) : (
                            <AiOutlineLike
                                className="cursor-pointer hover:text-green-400 inline mr-1"
                                onClick={Like}
                            />
                        )}
                        <span className="text-sm">
                            {formatter.format(cmnt.likes)}
                        </span>
                    </div>
                    <div>
                        <BiComment
                            className="cursor-pointer inline hover:text-orange-400 mr-1"
                            onClick={StartReplying}
                        />
                        <span className="text-sm">Reply</span>
                    </div>
                    {cmnt.user._id == currentUser?.id && (
                        <>
                            <div>
                                <AiOutlineEdit
                                    className="cursor-pointer hover:text-blue inline mr-1"
                                    onClick={StartEditing}
                                />
                                <span className="text-sm">Edit</span>
                            </div>
                            <div>
                                <AiOutlineDelete
                                    className="cursor-pointer hover:text-red inline mr-1"
                                    onClick={Delete}
                                />
                                <span className="text-sm">Delete</span>
                            </div>
                        </>
                    )}
                </div>
                {replying.id == cmnt._id && (
                    <AddCommentBox
                        value={replying.commentStr}
                        onChange={ChangeReplying}
                        onCancel={CancelReplying}
                        onSubmit={SubmitReplying}
                    />
                )}
                {cmnt.subComments.map((c, idx) => {
                    const newPath = path.concat([idx])
                    return (
                        <CommentBox
                            key={newPath}
                            cmnt={c}
                            path={newPath}
                            editing={editing}
                            setEditing={setEditing}
                            replying={replying}
                            setReplying={setReplying}
                            currentUser={currentUser}
                            articleId={articleId}
                        />
                    )
                })}
            </div>
        </div>
    )
}

function Comments({ articleId, session }) {
    const comments = useSelector(state => state.comments.comments)
    const dispatch = useDispatch()
    const [commenting, setCommenting] = useState({
        bool: false,
        commentStr: '',
    })
    const [editing, setEditing] = useState({ id: -1, commentStr: '' })
    const [replying, setReplying] = useState({
        id: -1,
        commentStr: '',
    })

    useEffect(() => {
        if (articleId)
            dispatch(
                listCommentsByArticle({
                    articleId,
                    page: 0,
                    items: 10,
                })
            )
    }, [articleId])

    return (
        <div>
            <div className="my-2">
                {commenting.bool ? (
                    <AddCommentBox
                        value={commenting.commentStr}
                        onSubmit={e => {
                            e.preventDefault()
                            dispatch(
                                addComments({
                                    articleId,
                                    content: commenting.commentStr,
                                    path: [],
                                    currentUser: session.data.user,
                                })
                            )
                            setCommenting({ bool: false, commentStr: '' })
                        }}
                        onChange={e =>
                            setCommenting({
                                bool: true,
                                commentStr: e.target.value,
                            })
                        }
                        onCancel={() =>
                            setCommenting({ bool: false, commentStr: '' })
                        }
                    />
                ) : (
                    <div
                        className="cursor-pointer"
                        onClick={() => {
                            if (session.status == 'unauthenticated')
                                dispatch(
                                    setAlert(
                                        'You must login to comment!',
                                        'danger'
                                    )
                                )
                            else setCommenting({ bool: true, commentStr: '' })
                        }}
                    >
                        <BiCommentAdd className="inline mr-2 " />
                        <span>Add Comment</span>
                    </div>
                )}
            </div>
            {comments?.length > 0 && (
                <div className="flex flex-col gap-2 border-blue border border-solid rounded-md p-2">
                    {comments?.map((c, idx) => (
                        <CommentBox
                            key={[idx]}
                            cmnt={c}
                            path={[idx]}
                            editing={editing}
                            setEditing={setEditing}
                            replying={replying}
                            setReplying={setReplying}
                            currentUser={session.data?.user}
                            articleId={articleId}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}

export default Comments
