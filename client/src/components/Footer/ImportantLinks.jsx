import React from 'react'
import { Link } from 'react-router-dom'

export default function ImportantLinks() {
    return (
        <ul className="text-base text-slate-700">
            <li className="hover:text-rose-700">
                <Link to="/advertisement">हामीसँग विज्ञापन गर्नुहोस्</Link>
            </li>

            <li className="hover:text-rose-700">
                <Link to="/feedback">प्रतिक्रिया</Link>
            </li>

            <li className="hover:text-rose-700">
                <Link to="/about">हाम्रो बारेमा</Link>
            </li>

            <li className="hover:text-rose-700">
                <Link to="/privacy_policy">गोपनीयता नीति</Link>
            </li>
        </ul>
    )
}
