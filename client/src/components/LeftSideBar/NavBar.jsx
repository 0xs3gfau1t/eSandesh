import React from 'react'
import { NavLink } from 'react-router-dom'

import LocationNews from './LocationNews'
import { getCatMap } from '../../utils/categoryMap'
export default function NavBar(activeCategory) {
    const catMap = getCatMap()
    const menuItems = Object.keys(catMap).map(cat => {
        return (
            <li key={cat} className="my-1">
                <NavLink
                    to={`/category/${cat}`}
                    className={({ isActive }) => {
                        return isActive
                            ? 'activeSideNav'
                            : 'hover:font-bold text-xl font-normal hover:text-darkblue hover:pl-4 hover:border-l-4 border-l-transparent hover:border-l-rose-700 transition-all duration-300'
                    }}
                >
                    {catMap[cat]}
                </NavLink>
            </li>
        )
    })
    return (
        <nav>
            <ul className="font-medium flex flex-col justify-between gap-1 mt-4 border-r-4 border-r-darkblue ">
                {menuItems}
                <li>
                    <LocationNews />
                </li>
            </ul>
        </nav>
    )
}
