import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from 'react-redux'
import { updateForexData } from "../../redux/reducers/misc";


export default function Forex() {
	// const [forexData, setForexData] = useState([]);
	const forexData = useSelector(state =>state.misc.data)
	// const focus = useSelector((state) => state.misc.focus)
	const dispatch = useDispatch();

	// useEffect(() => {
	// 	const fetchData = async () => {
	// 		const response = await fetch("https://www.nrb.org.np/api/forex/v1/rate");
	// 		const data = await response.json();
	// 		setForexData(data.data.payload.rates);
	// 	};
	// 	fetchData();
	//   }, []);

	useEffect(() => {
		const fetchData = async () => {
			const response = await fetch("https://www.nrb.org.np/api/forex/v1/rate");
			const response_data = await response.json();
			const data = response_data.data.payload.rates;
			dispatch(updateForexData(data))
		};
		fetchData();
	  }, [dispatch]);

	  
	  return (
		<div className=" grid table-fixed w-8/12 ">
		  <div className=" overflow-x-auto ">
			<table className="">
			  <thead>
				<tr>
				  <th className="px-4 py-2">Currency</th>{console.log(forexData)}
				  {forexData.map(value => (
					<th key={value.currency.iso3} className="px-4 py-2">
					  {value.currency.iso3}
					</th>
				  ))}
				</tr>
			  </thead>
			  <tbody>
				<tr>
				  <td className="px-4 py-2 font-bold">Buy</td>
				  {forexData.map(value => (
					<td key={value.currency.iso3} className="px-4 py-2">
					  {value.buy}
					</td>
				  ))}
				</tr>
				<tr>
				  <td className="px-4 py-2 font-bold">Sell</td>
				  {forexData.map(value => (
					<td key={value.currency.iso3} className="px-4 py-2">
					  {value.sell}
					</td>
				  ))}
				</tr>
			  </tbody>
			</table>
		  </div>
		</div>
	  );
}
