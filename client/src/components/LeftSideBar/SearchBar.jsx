import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AiOutlineSearch } from 'react-icons/ai'
import { GiSettingsKnobs } from 'react-icons/gi'

const initialSettings = {
    q: '',
    sortBy: -1,
    sortOrder: -1,
    author: '',
}

const SORT_OPTIONS = [
    { display: 'Date', value: 'createdAt' },
    { display: 'Hits', value: 'hits' },
]
const SORT_ORDERS = [
    { display: 'Ascending', value: 1 },
    { display: 'Descending', value: -1 },
]

const SearchBar = () => {
    const navigate = useNavigate()

    const onChange = e => setSettings(o => ({ ...o, q: e.target.value }))
    const onSubmit = e => {
        e.preventDefault()

        const params = new URLSearchParams()
        if (settings.q) params.set('q', settings.q)

        if (settings.sortBy >= 0 && settings.sortBy < SORT_OPTIONS.length) {
            params.set('sort', SORT_OPTIONS[settings.sortBy].value)
            params.set('order', SORT_ORDERS[settings.sortOrder].value)
        }

        if (settings.author) params.set('author', settings.author)

        navigate(`/search?${params.toString()}`) && setSettings(initialSettings)
    }

    const [settings, setSettings] = useState(initialSettings)
    const setSortBy = idx =>
        setSettings(o => ({ ...o, sortBy: o.sortBy == idx ? -1 : idx }))
    const setSortOrder = idx => setSettings(o => ({ ...o, sortOrder: idx }))
    const setAuthor = e => setSettings(o => ({ ...o, author: e.target.value }))

    const [showFilters, setShowFilters] = useState(false)
    const toggleFilter = () => setShowFilters(o => !o)

    return (
        <div className="mr-4">
            <form
                className={`mt-1 flex border rounded-md border-solid border-black shadow-sm focus-within:shadow-md ${
                    showFilters ? 'rounded-b-none' : ''
                }`}
                onSubmit={onSubmit}
            >
                <input
                    type="text"
                    value={settings.q}
                    onChange={onChange}
                    className="w-full bg-transparent border-slate-400 px-2 focus:outline-none rounded-md placeholder:indent-2"
                    placeholder="किवर्ड द्वारा खोज्नुहोस्"
                />
                <GiSettingsKnobs
                    className="h-10 w-10 text-black px-2 rounded-md block hover:scale-110"
                    onClick={toggleFilter}
                />
                <AiOutlineSearch
                    className="h-10 w-10 text-black px-2 rounded-md block hover:scale-110"
                    onClick={onSubmit}
                />
            </form>
            {showFilters && (
                <div className="border border-t-0 rounded-b-md border-solid border-black p-2">
                    <DropDown
                        options={SORT_OPTIONS}
                        active={settings.sortBy}
                        setActive={setSortBy}
                        title="Sort By"
                    />
                    <DropDown
                        options={SORT_ORDERS}
                        active={settings.sortOrder}
                        setActive={setSortOrder}
                        title="Sort Order"
                    />
                    <div className="flex items-center pr-4">
                        <span className="text-slate-800 font-mono cursor-pointer">
                            Author:
                        </span>
                        <input
                            type="text"
                            className="focus:outline-none h-5 bg-transparent border-b border-solid border-black px-2 w-full"
                            value={settings.author}
                            onChange={setAuthor}
                        />
                    </div>
                </div>
            )}
        </div>
    )
}

/**
 * @param {{options: {display: string, value: any}[], active: number, setActive: (index: number)=>void, title: string}} props
 */
const DropDown = ({ options, active, setActive, title }) => {
    const [open, setOpen] = useState(false)

    return (
        <div className="flex flex-col justify-center">
            <span
                className="text-slate-800 font-mono cursor-pointer"
                onClick={() => setOpen(o => !o)}
            >
                {title}: {options[active]?.display || 'Select'}
            </span>
            {open && (
                <ul className="flex flex-wrap gap-2 text-sm">
                    {options.map((o, idx) => (
                        <span
                            key={idx}
                            className={`${
                                idx == active
                                    ? 'text-green-700 hover:text-rose-400'
                                    : 'text-slate-800 hover:text-green-400'
                            } cursor-pointer`}
                            onClick={() => setActive(idx)}
                        >
                            {o.display}
                        </span>
                    ))}
                </ul>
            )}
        </div>
    )
}

export default SearchBar
