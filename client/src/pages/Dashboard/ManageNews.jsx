import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { BsFillPlusSquareFill } from "react-icons/bs"
import { Link } from "react-router-dom"
import { listNews } from "../../redux/actions/dashNews"

const ManageNews = () => {
	const news = useSelector(state => state.dashNews)
	const dispatch = useDispatch()

	useEffect(() => {
		console.log("Hemlo")
		dispatch(listNews(1))
	}, [])

	return (
		<>
			<Link
				to="/admin/dashboard/newsedit"
				className="flex gap-4 my-4 mx-auto w-2/4 text-2xl bg-green-700 py-2 px-4 rounded justify-center cursor-pointer"
			>
				<BsFillPlusSquareFill className="ml-4 text-[1.8rem]" />
				<h2 className="">Create news</h2>
			</Link>
			<div className=""></div>
		</>
	)
}

export default ManageNews
