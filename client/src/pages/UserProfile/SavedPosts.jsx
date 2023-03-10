import axios from 'axios'
import { useEffect, useState } from 'react'
import { AiFillDelete } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { setAlert } from '../../redux/actions/misc'
export default function SavedPosts() {
    const [posts, setPosts] = useState([])
    const dispatch = useDispatch()

    async function getSavedPosts() {
        await axios
            .get('/api/user/article')
            .then(res => {
                setPosts(res.data.articles)
            })
            .catch(err => {
                console.log(err)
                dispatch(setAlert('Something went wrong', 'danger'))
            })
    }
    useEffect(() => {
        getSavedPosts()
    }, [])

    const deletePost = id => {
        axios
            .delete('/api/user/article', { data: { id: id } })
            .then(res => {
                getSavedPosts()
                dispatch(setAlert('Removed from saved list.', 'success'))
            })
            .catch(err => {
                dispatch(setAlert('Something went wrong', 'danger'))
            })
    }
    return (
        <div>
            <h2 className="font-bold text-base font-english leading-loose">
                Saved Posts
            </h2>
            <ul className="flex items-center gap-4">
                {posts &&
                    posts.map(post => {
                        return (
                            <li
                                key={post._id}
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
                                    -Bagheshwori Pathak 2023-02-23
                                </p>
                                <AiFillDelete
                                    className="ml-36 cursor-pointer hover:text-rose-700"
                                    onClick={e => deletePost(post._id)}
                                />
                            </li>
                        )
                    })}
            </ul>
        </div>
    )
}
