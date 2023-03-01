import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BsFillPlusSquareFill } from 'react-icons/bs'

import { FormText } from '../../components/common'
import { Popup } from '../../components/common'
import { createAd, getAd, listAds } from '../../redux/actions/ads'
import { AiFillDelete, AiFillEdit } from 'react-icons/ai'

const POPUP_STATE = Object.freeze({
    ADD: 'Add new Ad',
    EDIT: 'Edit Ad',
    INACTIVE: false,
})

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
}

export default function AdsMan() {
    const ads = useSelector(state => state.ads.adsList)
    const [prop, setProp] = useState(initState)
    const [show, setShow] = useState(POPUP_STATE.INACTIVE)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(listAds())
    }, [])

    const handleChange = e => {
        if (['imageX', 'imageY', 'imageSq', 'audio'].includes(e.target.name))
            setProp({ ...prop, [e.target.name]: e.target.files[0] })
        else setProp({ ...prop, [e.target.name]: e.target.value })
    }
    const onSubmit = () => {
        switch (show) {
            case POPUP_STATE.ADD:
                dispatch(createAd(prop))
                dispatch(listAds(prop))
                break
            case POPUP_STATE.EDIT:
                //dispatch(editAd(prop))
                break
        }
        setProp(initState)
        setShow(false)
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
                        labelText="Target URL for Ad"
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
                                                    <div className="flex gap-x-3">
                                                        <AiFillEdit
                                                            className="hover:cursor-pointer hover:scale-125 duration-200"
                                                            size={'1.4em'}
                                                            onClick={async e => {
                                                                const adData =
                                                                    await dispatch(
                                                                        getAd(
                                                                            e.target.getAttribute(
                                                                                'data-id'
                                                                            )
                                                                        )
                                                                    )
                                                                setProp({
                                                                    ...adData
                                                                        .payload
                                                                        .data,
                                                                    expiry: Math.ceil(
                                                                        (new Date(
                                                                            adData.payload.data.expiry
                                                                        ) -
                                                                            Date.now()) /
                                                                            (24 *
                                                                                60 *
                                                                                60 *
                                                                                1000)
                                                                    ),
                                                                })
                                                                setShow(true)
                                                            }}
                                                            data-id={ad._id}
                                                        />
                                                        <AiFillDelete
                                                            className="hover:cursor-pointer hover:scale-125 duration-200"
                                                            size={'1.4em'}
                                                            color={'#aa0000'}
                                                            onClick={() => {
                                                                //dispatch(deleteAd())
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
                </div>
            </div>
        </div>
    )
}
