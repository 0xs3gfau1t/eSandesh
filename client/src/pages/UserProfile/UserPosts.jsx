import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
    AiOutlineArrowRight,
    AiOutlineDelete,
    AiOutlineEdit,
} from 'react-icons/ai'
import { getRelativeTime } from '../../utils/relativeDuration'
import { Popup } from '../../components/common'
import { useAxiosError } from '../../utils/useAxiosError'

export default function UserPosts() {
    const [posts, setPosts] = useState([])
    const [nextPage, setCurrentPage] = useState(0)
    const [deleting, setDeleting] = useState(false)
    const { onError } = useAxiosError()

    const fetchPost = () => {
        if (nextPage != undefined)
            axios
                .get('/api/article/byuser', {
                    params: { page: nextPage },
                    withCredentials: true,
                })
                .then(res => {
                    setCurrentPage(res.data.nextPage)
                    setPosts(o => o.concat(res.data.articles))
                })
                .catch(onError)
    }

    useEffect(fetchPost, [])

    const deletePost = () => {
        if (!deleting) return
        axios
            .delete('/api/article', {
                params: { id: deleting },
                withCredentials: true,
            })
            .then(res => {
                if (res.status == 200) {
                    setPosts(o => o.filter(p => p._id != deleting))
                    setDeleting(false)
                }
            })
            .catch(onError)
    }

    return (
        <div className="py-4">
            <h2 className="font-bold text-base leading-loose">My Posts</h2>
            {posts.length > 0 ? (
                <ul className="flex items-start gap-x-8 gap-y-0 flex-wrap">
                    {posts.map(post => {
                        return (
                            <li
                                key={post._id}
                                className="w-48 flex flex-col my-4 shadow-md hover:shadow-lg duration-200 rounded-md bg-white p-4"
                            >
                                <img
                                    className="w-full h-24 object-cover rounded-sm"
                                    src={
                                        post.img ||
                                        'https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png'
                                    }
                                />
                                <Link
                                    to={`/news/${post.year}/${post.month}/${post.slug}`}
                                    className="font-english font-bold leading-none my-1 truncate"
                                    title={post.title}
                                >
                                    {post.title}
                                </Link>
                                <div className="flex flex-col text-sm">
                                    <span className="text-gray-600">
                                        {'Created ' +
                                            getRelativeTime(
                                                new Date(post.createdAt)
                                            )}
                                    </span>
                                    <div className="overflow-x-scroll flex flex-nowrap gap-2">
                                        {(() => {
                                            let cat = post.category.map(
                                                c =>
                                                    c.charAt(0).toUpperCase() +
                                                    c.slice(1).toLowerCase()
                                            )
                                            cat = cat.join(', ')
                                            return (
                                                <span
                                                    className="truncate"
                                                    title={cat}
                                                >
                                                    {cat}
                                                </span>
                                            )
                                        })()}
                                    </div>
                                </div>
                                <hr className="my-1" />
                                <div className="flex justify-end gap-1">
                                    <AiOutlineEdit
                                        className="w-5 h-5 cursor-pointer hover:text-blue"
                                        title="Edit post"
                                        onClick={() => {
                                            console.error(
                                                new Error(
                                                    'Unimplemented: Edit news in popup'
                                                )
                                            )
                                        }}
                                    />
                                    <AiOutlineDelete
                                        className="w-5 h-5 cursor-pointer hover:text-red"
                                        title="Delete post"
                                        onClick={() => setDeleting(post._id)}
                                    />
                                </div>
                            </li>
                        )
                    })}
                    {nextPage !== undefined && (
                        <li
                            className="flex flex-col my-4 shadow-md hover:shadow-lg duration-200 rounded-md bg-white p-4 self-center cursor-pointer"
                            onClick={fetchPost}
                        >
                            <span className="text-lg">Load More</span>
                            <AiOutlineArrowRight className="align-middle w-full" />
                        </li>
                    )}
                </ul>
            ) : (
                <div className="text-center py-8 text-xl">
                    No articles posted
                </div>
            )}

            {deleting != false && (
                <Popup title="Delete Post" setShow={setDeleting}>
                    <h1>Are you sure you want to delete this post</h1>
                    <div className="flex justify-end gap-2 items-center">
                        <div
                            className="py-1 px-4 rounded-md cursor-pointer border-blue border-solid border shadow-sm hover:shadow-md"
                            onClick={() => setDeleting(false)}
                        >
                            No
                        </div>
                        <div
                            className="py-1 px-4 rounded-md cursor-pointer border-red border-solid border shadown-sm hover:shadow-md"
                            onClick={deletePost}
                        >
                            Yes
                        </div>
                    </div>
                </Popup>
            )}
        </div>
    )
}
