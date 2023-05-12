import axios from 'axios'
import { useEffect, useState } from 'react'
import { AiFillDelete } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { setAlert } from '../../redux/actions/misc'
export default function SavedPosts() {
    const [posts, setPosts] = useState([])
    const dispatch = useDispatch()

    useEffect(() => {
        axios
            .get('/api/user/article')
            .then(res => setPosts(res.data.articles))
            .catch(err => {
                console.log(err)
                dispatch(setAlert('Something went wrong', 'danger'))
            })
    }, [])

    const deletePost = id => {
        axios
            .delete('/api/user/article', { data: { id: id } })
            .then(res => {
                if (res.status == 200) {
                    setPosts(o => o.filter(x => x.id != id))
                    dispatch(setAlert('Removed from saved list.', 'success'))
                }
            })
            .catch(err => {
                console.error(err)
                dispatch(setAlert('Something went wrong', 'danger'))
            })
    }
    return (
        <div>
            <h2 className="font-bold text-base leading-loose">Saved Posts</h2>
            {posts.length > 0 ? (
                <ul className="flex items-center gap-4 flex-wrap">
                    {posts.map(post => {
                        return (
                            <li
                                key={post.id}
                                className="w-48 flex flex-col my-4 shadow-md hover:shadow-lg duration-200 rounded-md bg-white p-4"
                            >
                                <img
                                    className="w-full h-24 object-cover rounded-sm"
                                    src="https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png"
                                />
                                <Link
                                    to={`/news/${post.year}/${post.month}/${post.slug}`}
                                    className="font-english font-bold leading-none my-4 truncate"
                                >
                                    {post.title}
                                </Link>
                                <p className="flex flex-col text-sm">
                                    <span>-{post.author}</span>{' '}
                                    <span>{post.updatedAt.slice(0, 10)}</span>
                                </p>
                                <AiFillDelete
                                    className="ml-36 cursor-pointer hover:text-rose-700"
                                    title="Unsave article"
                                    onClick={() => deletePost(post.id)}
                                />
                            </li>
                        )
                    })}
                </ul>
            ) : (
                <div className="text-center py-8 text-xl">
                    No articles saved
                </div>
            )}
        </div>
    )
}
