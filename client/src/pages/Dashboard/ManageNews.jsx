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
		dispatch(listNews())
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
			<div className="">
				<div className="flex flex-col">
					<div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
						<div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
							<div className="overflow-hidden">
								<table className="min-w-full table-auto">
									<thead className="border-b">
										<tr>
											<th
												scope="col"
												className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
											>
												#
											</th>
											<th
												scope="col"
												className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
											>
												Title
											</th>
											<th
												scope="col"
												className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
											>
												Date Created
											</th>
											<th
												scope="col"
												className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
											>
												Hits
											</th>
											<th
												scope="col"
												className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
											>
												Categories
											</th>
										</tr>
									</thead>
									<tbody>
										<tr className="border-b">
											<td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
												1
											</td>
											<td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
												Mark hbjhbfgdhfjgb ghdfhgdkfh
												hgdfghdkj gjfdghdkjf
											</td>
											<td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
												Otto
											</td>
											<td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
												@mdo
											</td>
										</tr>
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default ManageNews
