import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BsFillPlusSquareFill } from 'react-icons/bs'

import { FormText } from '../../components/common'
import { Popup, FormSelect } from '../../components/common'
import {
    createAd,
    editAd,
    getAd,
    listAds,
    deleteAd,
} from '../../redux/actions/ads'
import {
    AiFillDelete,
    AiFillEdit,
    AiOutlineCaretRight,
    AiOutlineCaretLeft,
} from 'react-icons/ai'

const POPUP_STATE = Object.freeze({
    ADD: 'Add new Ad',
    EDIT: 'Edit Ad',
    INACTIVE: false,
})
const categories = [
    'All',
    'POLITICS',
    'BUSINESS',
    'SPORTS',
    'ENTERTAINMENT',
    'STORY',
    'FINANCE',
    'GLOBAL',
    'BUSINESS',
    'HEALTH',
    'TECHNOLOGY',
]

const initState = {
    name: '',
    category: '',
    imageX: undefined,
    imageY: undefined,
    imageSq: undefined,
    audio: undefined,
    priority: 10,
    redirectUrl: '',
    expiry: 1,
    publisher: null,
    _id: null,
    popup: false,
}

export default function AdsMan() {
    const ads = useSelector(state => state.ads.adsList)
    const [prop, setProp] = useState(initState)
    const [show, setShow] = useState(POPUP_STATE.INACTIVE)
    const dispatch = useDispatch()
    // const [page, setPage] = useState(0)
    let [filter, setFilter] = useState({ page: 0, category: '', popup: false })

    useEffect(() => {
        let filterCopy = JSON.parse(JSON.stringify(filter))
        if (!filter.popup) {
            delete filterCopy.popup
        }
        dispatch(listAds(filterCopy))
    }, [filter])

    const handleChange = e => {
        if (['imageX', 'imageY', 'imageSq', 'audio'].includes(e.target.name))
            setProp({ ...prop, [e.target.name]: e.target.files[0] })
        else if (e.target.name === 'popup')
            setProp({ ...prop, popup: e.target.checked })
        else setProp({ ...prop, [e.target.name]: e.target.value })
    }
    const handleFilter = e => {
        setFilter({
            ...filter,
            [e.target.name]: e.target.value != 'All' ? e.target.value : '',
            page: 0,
        })
    }
    const onSubmit = async () => {
        switch (show) {
            case POPUP_STATE.ADD:
                await createAd(prop)
                break
            case POPUP_STATE.EDIT:
                await editAd(prop)
                break
        }
        dispatch(listAds({ page }))
        setProp(initState)
        setShow(POPUP_STATE.INACTIVE)
    }
    return (
        <div className="mx-8">
            <div
                className="addNew"
                onClick={() => {
                    setProp(initState)
                    setShow(POPUP_STATE.ADD)
                }}
            >
                <BsFillPlusSquareFill className="ml-4 text-[1.8rem] " />
                <h2>Add new ad</h2>
            </div>
            {show && (
                <Popup title={show} setShow={setShow}>
                    <FormText
                        type="text"
                        name="name"
                        value={prop.name}
                        labelText="Name of Company"
                        handleChange={handleChange}
                    />
                    <div className="flex gap-x-2">
                        <FormText
                            type="file"
                            name="imageX"
                            labelText="Horizontal Image(150x50 px)"
                            handleChange={handleChange}
                        />
                        <FormText
                            type="file"
                            name="imageY"
                            labelText="Vertical Image (50x150px)"
                            handleChange={handleChange}
                        />
                        <FormText
                            type="file"
                            name="imageSq"
                            labelText="Square Image (100x100px)"
                            handleChange={handleChange}
                        />
                    </div>
                    <FormText
                        type="file"
                        name="audio"
                        labelText="Audio Ad (2MB, 5s)"
                        handleChange={handleChange}
                    />
                    <FormText
                        type="text"
                        name="redirectUrl"
                        value={prop.redirectUrl}
                        labelText="Redirect URL for Ad"
                        handleChange={handleChange}
                    />
                    <FormText
                        type="text"
                        name="category"
                        value={prop.category}
                        labelText="Category"
                        handleChange={handleChange}
                    />
                    <div className="flex gap-4">
                        <FormText
                            type="number"
                            name="priority"
                            value={prop.priority}
                            labelText="Priority"
                            handleChange={handleChange}
                        />
                        <FormText
                            type="number"
                            name="expiry"
                            value={prop.expiry}
                            labelText="Expire after ? days"
                            handleChange={handleChange}
                        />
                        <FormText
                            type="checkbox"
                            name="popup"
                            labelText="Mark as Popup"
                            handleChange={handleChange}
                            className="flex whitespace-nowrap place-items-center place-content-center gap-x-2 ml-8 text-xl"
                            checked={prop.popup}
                        />
                    </div>
                    <button
                        className="bg-darkblue text-white"
                        onClick={onSubmit}
                    >
                        Save
                    </button>
                </Popup>
            )}

            <div className="flex flex-col">
                <div className="flex ml-2 place-items-center gap-16">
                    <FormSelect
                        name={'category'}
                        options={categories}
                        handleChange={handleFilter}
                    />
                    <div className="flex flex-col">
                        <span>Popup</span>
                        <input
                            type={'checkbox'}
                            checked={filter.popup}
                            onChange={e =>
                                setFilter({
                                    ...filter,
                                    popup: !filter.popup,
                                })
                            }
                        />
                    </div>
                    <div className="flex">
                        <AiOutlineCaretLeft
                            className="cursor-pointer hover:text-rose-700 text-3xl"
                            onClick={e =>
                                setFilter({
                                    ...filter,
                                    page:
                                        filter.page == 0
                                            ? filter.page
                                            : filter.page - 1,
                                })
                            }
                        />
                        <span className="py-1 px-2 bg-cyan-900 place-items-center rounded text-white">
                            Page {filter.page + 1}
                        </span>
                        <AiOutlineCaretRight
                            className="cursor-pointer hover:text-rose-700 text-3xl"
                            onClick={e =>
                                setFilter({ ...filter, page: filter.page + 1 })
                            }
                        />
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                        <table className="newsListTable w-full border">
                            <thead className="border-b">
                                <tr>
                                    <th>SN</th>
                                    <th>Company</th>
                                    <th>Priority</th>
                                    <th>Hits</th>
                                    <th>Categories</th>
                                    <th>Last Modified</th>
                                    <th>Expiry Date</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {ads &&
                                    ads.map((ad, index) => {
                                        return (
                                            <tr
                                                key={index}
                                                className="border-b"
                                                data-id={ad._id}
                                            >
                                                <td>{parseInt(index) + 1}</td>
                                                <td>{ad.name}</td>
                                                <td>{ad.priority}</td>
                                                <td>{ad.hits}</td>
                                                <td>
                                                    {ad.category.join(', ')}
                                                </td>
                                                <td>
                                                    {new Date(
                                                        ad.updatedAt
                                                    ).toLocaleDateString()}
                                                </td>
                                                <td>
                                                    {new Date(
                                                        ad.expiry
                                                    ).toLocaleDateString()}
                                                </td>
                                                <td>
                                                    <div
                                                        className="flex gap-x-3"
                                                        data-id={ad._id}
                                                    >
                                                        <AiFillEdit
                                                            className="hover:cursor-pointer hover:scale-125 duration-200"
                                                            size={'1.4em'}
                                                            onClick={async e => {
                                                                const adData =
                                                                    await getAd(
                                                                        e.target.parentNode.getAttribute(
                                                                            'data-id'
                                                                        )
                                                                    )

                                                                setProp({
                                                                    ...adData,
                                                                    // Revert expiry from DateTime to No. of days
                                                                    expiry: Math.ceil(
                                                                        (new Date(
                                                                            adData.expiry
                                                                        ) -
                                                                            Date.now()) /
                                                                            (24 *
                                                                                60 *
                                                                                60 *
                                                                                1000)
                                                                    ),
                                                                    imageX: adData
                                                                        ?.image
                                                                        ?.rectX,
                                                                    imageY: adData
                                                                        ?.image
                                                                        ?.rectY,
                                                                    imageSq:
                                                                        adData
                                                                            ?.image
                                                                            ?.square,
                                                                })
                                                                setShow(
                                                                    POPUP_STATE.EDIT
                                                                )
                                                            }}
                                                        />
                                                        <AiFillDelete
                                                            className="hover:cursor-pointer hover:scale-125 duration-200"
                                                            size={'1.4em'}
                                                            color={'#aa0000'}
                                                            onClick={e => {
                                                                const id =
                                                                    e.target.parentNode.parentNode.getAttribute(
                                                                        'data-id'
                                                                    )
                                                                dispatch(
                                                                    deleteAd({
                                                                        id,
                                                                    })
                                                                )
                                                            }}
                                                        />
                                                    </div>
                                                </td>
                                            </tr>
                                        )
                                    })}
                            </tbody>
                        </table>
                    </div>
                    {/* <div className="flex justify-center space-x-32">
                        <AiOutlineArrowLeft
                            className="hover:cursor-pointer hover:scale-125"
                            onClick={() => setPage(page - 1)}
                        />
                        <p>{'Page ' + page}</p>
                        <AiOutlineArrowRight
                            className="hover:cursor-pointer hover:scale-125"
                            onClick={() => setPage(page + 1)}
                        />
                    </div> */}
                </div>
            </div>
        </div>
    )
}
