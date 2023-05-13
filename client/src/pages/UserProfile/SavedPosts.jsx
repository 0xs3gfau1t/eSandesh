import axios from 'axios'
import { useEffect, useState } from 'react'
import { BsBookmarkDash } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import { getRelativeTime } from '../../utils/relativeDuration'
import { AiOutlineArrowRight } from 'react-icons/ai'
import { useAxiosError } from '../../utils/useAxiosError'

export default function SavedPosts() {
    const [posts, setPosts] = useState([])
    const [nextPage, setNextPage] = useState(0)

    const { onError } = useAxiosError()

    const fetchSaved = () => {
        if (nextPage != undefined)
            axios
                .get('/api/user/article', {
                    params: { page: nextPage },
                    withCredentials: true,
                })
                .then(res => {
                    setNextPage(res.data.nextPage)
                    setPosts(o => o.concat(res.data.articles))
                })
                .catch(onError)
    }

    useEffect(fetchSaved, [])

    const unsavePost = id => {
        axios
            .delete('/api/user/article', { data: { id: id } })
            .then(res => {
                if (res.status == 200) {
                    setPosts(o => o.filter(x => x.id != id))
                }
            })
            .catch(onError)
    }

    return (
        <div>
            <h2 className="font-bold text-base leading-loose">Saved Posts</h2>
            {posts.length > 0 ? (
                <ul className="flex items-center gap-4 flex-wrap">
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
                                    <span>{post.author.name}</span>
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
                                <div className="flex justify-end gap-1 py-1 px-2">
                                    <BsBookmarkDash
                                        className="w-5 h-5 cursor-pointer hover:text-red"
                                        title="Unsave article"
                                        onClick={() => unsavePost(post.id)}
                                    />
                                </div>
                            </li>
                        )
                    })}
                    {nextPage !== undefined && (
                        <li
                            className="flex flex-col my-4 shadow-md hover:shadow-lg duration-200 rounded-md bg-white p-4 self-center"
                            onClick={fetchSaved}
                        >
                            <span className="text-lg">Load More</span>
                            <AiOutlineArrowRight className="align-middle w-full" />
                        </li>
                    )}
                </ul>
            ) : (
                <div className="text-center py-8 text-xl">
                    No articles saved
                </div>
            )}
        </div>
    )
}
