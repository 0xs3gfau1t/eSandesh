import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { BsFillPlusSquareFill } from "react-icons/bs"
import { Link } from "react-router-dom"

import { listNews } from "../../redux/actions/dashNews"
import { DashActions } from "../../components/common"

const ManageNews = () => {
	const news = useSelector(state => state.news.newsList)
	const dispatch = useDispatch()
	let [page, setPage] = useState(0)

	useEffect(() => {
		dispatch(listNews(page))
	}, [page])

	return (
		<>
			<Link to="/admin/dashboard/addNews" className="addNew">
				<BsFillPlusSquareFill className="ml-4 text-[1.8rem] " />
				<h2>Create news</h2>
			</Link>

			<div className="flex flex-col">
				<div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
					<div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
						<div className="overflow-hidden">
							<table className="newsListTable min-w-full table-auto">
								<thead className="border-b">
									<tr>
										<th scope="col">#</th>
										<th scope="col">Title</th>
										<th scope="col">Date Modified</th>
										<th scope="col">Hits</th>
										<th scope="col">Categories</th>
										<th scope="col">Actions</th>
									</tr>
								</thead>
								<tbody>
									{news[page] &&
										Object.keys(news[page]).map(nws => {
											let khabar = news[page][nws]
											return (
												<tr
													key={nws}
													className="border-b"
												>
													<td>{parseInt(nws) + 1}</td>
													<td className="truncate">
														<Link
															to={`/news/${khabar.year}/${khabar.month}/${khabar.slug}`}
															target="_blank"
														>
															{khabar.title
																? khabar.title
																: ""}
														</Link>
													</td>
													<td>
														{new Date(
															khabar.updatedAt
														).toLocaleDateString()}
													</td>
													<td>{khabar.hits}</td>
													<td>
														{khabar.category
															? khabar.category.join(
																	","
															  )
															: ""}
													</td>
													<td>
														<DashActions
															year={khabar.year}
															month={khabar.month}
															slug={khabar.slug}
															id={khabar._id}
														/>
													</td>
												</tr>
											)
										})}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default ManageNews
