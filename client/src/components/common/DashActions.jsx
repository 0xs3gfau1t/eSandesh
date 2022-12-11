import { AiFillEdit, AiFillDelete } from "react-icons/ai"
import { Link } from "react-router-dom"

const DashActions = ({ year, month, slug }) => {
	return (
		<div className="flex gap-5 text-xl">
			<Link to={`editnews/${year}/${month}/${slug}`}>
				<AiFillEdit className="cursor-pointer hover:text-rose-700 hover:scale-125" />
			</Link>
			<AiFillDelete className="cursor-pointer hover:text-rose-700 hover:scale-125" />
		</div>
	)
}

export default DashActions
