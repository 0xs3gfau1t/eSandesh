import { BsFillPlusSquareFill } from "react-icons/bs"
import { Link } from "react-router-dom"

const ManageNews = () => {
	return (
		<>
			<Link
				to="/admin/dashboard/newsedit"
				className="flex gap-4 my-4 mx-auto w-2/4 text-2xl bg-green-700 py-2 px-4 rounded justify-center cursor-pointer"
			>
				<BsFillPlusSquareFill className="ml-4 text-[1.8rem]" />
				<h2 className="">Create news</h2>
			</Link>
		</>
	)
}

export default ManageNews
