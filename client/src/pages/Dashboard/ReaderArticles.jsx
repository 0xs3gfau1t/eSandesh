import axios from "axios";
import React, { useEffect, useState } from "react";
import { BsCalendar2Check } from "react-icons/bs";
import { Link } from "react-router-dom";

export default function ReaderArticles() {
	const [data, setData] = useState([]);
	useEffect(() => {
		axios
			.get("/api/article/topublish", { withCredentials: true })
			.then((res) => setData(res.data));
	}, []);
	const approve = (id) => {
		axios
			.post("/api/article/publish", { id }, { withCredentials: true })
			.then(() => {
				setData((oldData) => oldData.filter((d) => d._id != id));
			});
	};
	return (
		<>
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
										<th scope="col">Approve</th>
									</tr>
								</thead>
								<tbody>
									{data?.map((article, idx) => (
										<tr key={article._id} className="border-b">
											<td>{idx + 1}</td>
											<td className="truncate">
												<Link
													to={`/news/${article.year}/${article.month}/${article.slug}`}
													target="_blank"
												>
													{article.title ? article.title : ""}
												</Link>
											</td>
											<td>{new Date(article.updatedAt).toLocaleString()}</td>
											<td>{article.hits}</td>
											<td>{article.category?.join(", ")}</td>
											<td>
												<BsCalendar2Check
													onClick={() => {
														approve(article._id);
													}}
													className="cursor-pointer hover:fill-green-500"
												/>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
