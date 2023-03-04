import { AiFillEdit, AiFillDelete } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { deleteNews } from '../../redux/actions/dashNews'

const DashActions = ({ year, month, slug, id }) => {
    const dispatch = useDispatch()
    const delNews = e => {
        dispatch(deleteNews(id))
        setTimeout(() => {
            location.reload() //temporary solution to get updated news list
        }, 3000)
    }

    return (
        <div className="flex gap-5 text-xl">
            <Link to={`editnews/${year}/${month}/${slug}`}>
                <AiFillEdit className="cursor-pointer hover:text-rose-700 hover:scale-125" />
            </Link>
            <AiFillDelete
                className="cursor-pointer hover:text-rose-700 hover:scale-125"
                onClick={delNews}
            />
        </div>
    )
}

export default DashActions
