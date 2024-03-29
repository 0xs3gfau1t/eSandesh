import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { updateForexData } from '../../redux/reducers/misc'

export default function Forex() {
    const forexData = useSelector(state => state.misc.forexData)
    const dispatch = useDispatch()

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(
                'https://www.nrb.org.np/api/forex/v1/rate'
            )
                .then(res => res.json())
                .then(res => dispatch(updateForexData(res.data.payload.rates)))
            // const response_data = await response.json()
            // const data = response_data.data.payload.rates
            // dispatch(updateForexData(data))
        }
        fetchData()
    }, [dispatch])

    return (
        <div className="grid table-fixed w-1/3">
            <div className="overflow-x-scroll no-scrollbar">
                <table className="">
                    <thead>
                        <tr>
                            <th className="px-2 py-1">मुद्रा:</th>
                            {forexData.map(value => (
                                <th
                                    key={value.currency.iso3}
                                    className="px-2 py-1"
                                >
                                    {value.currency.iso3}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="px-2 py-1 font-bold">खरिद:</td>
                            {forexData.map(value => (
                                <td
                                    key={value.currency.iso3}
                                    className="px-2 py-1"
                                >
                                    {value.buy}
                                </td>
                            ))}
                        </tr>
                        <tr>
                            <td className="px-2 py-1 font-bold">बिक्री:</td>
                            {forexData.map(value => (
                                <td
                                    key={value.currency.iso3}
                                    className="px-2 py-1"
                                >
                                    {value.sell}
                                </td>
                            ))}
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}
