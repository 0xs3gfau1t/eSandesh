import React from 'react'
import { Link } from 'react-router-dom'

export default function ExploreMenu() {
    return (
        <ul className="text-slate-700 text-base">
            <li className="hover:text-rose-700">
                <Link to="/category/trending">ट्रेन्डिङ</Link>
            </li>
            <li className="hover:text-rose-700">
                <Link to="/category/global">विश्वव्यापी</Link>
            </li>
            <li className="hover:text-rose-700">
                <Link to="/category/politics">राजनीति</Link>
            </li>
            <li className="hover:text-rose-700">
                <Link to="/category/sports">खेलकुद</Link>
            </li>
        </ul>
    )
}
