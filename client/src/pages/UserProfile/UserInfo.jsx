import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { RiImageAddLine } from 'react-icons/ri'
import { FiEdit } from 'react-icons/fi'
import { CiSquareRemove } from 'react-icons/ci'
import { RxReset } from 'react-icons/rx'
import { AiOutlineEdit, AiOutlineSave } from 'react-icons/ai'

const sample = {
    _id: '63920ba318bdf6576c8a420d',
    name: 'immo',
    email: 'vizandabijan@gmail.com',
    image: '/api/user/image?id=63920ba318bdf6576c8a420d',
    accounts: [
        {
            _id: '645ce97437132883e8686b74',
            provider: 'facebook',
        },
    ],
}

export default function UserInfo() {
    const [user, setData] = useState()
    const [newImage, setNewImage] = useState({ file: null, buffer: null })
    const [name, setName] = useState(-1)

    useEffect(() => {
        axios.get('/api/user/').then(res => setData(res.data.userInfo))
    }, [])

    const loadImage = e => {
        if (!e.target.files) return

        const reader = new FileReader()
        reader.readAsDataURL(e.target.files[0])

        reader.onload = s =>
            setNewImage({ file: e.target.files[0], buffer: s.target?.result })
    }

    const resetImage = e => {
        e.stopPropagation()
        e.preventDefault()
        setNewImage({ file: null, buffer: null })
    }

    const saveImage = e => {
        e.stopPropagation()
        e.preventDefault()
        const data = new FormData()
        data.append('image', newImage.file)
        axios
            .post('/api/user/image', data, { withCredentials: true })
            .then(res => {
                if (res.status == 200) {
                    setData(o => ({ ...o, image: res.data.image }))
                    setNewImage({ file: null, buffer: null })
                }
            })
    }

    const removeImage = e => {
        e.stopPropagation()
        e.preventDefault()
        axios.delete('/api/user/image', { withCredentials: true }).then(res => {
            if (res.status == 200) {
                setData(o => ({ ...o, image: res.data.image }))
                setNewImage({ file: null, buffer: null })
            }
        })
    }

    const editName = () => setName(user.name)

    const saveName = e => {
        e.preventDefault()
        if (!name) return
        axios
            .post('/api/user/', { name: name }, { withCredentials: true })
            .then(res => {
                if (res.status == 200) {
                    setData(o => ({ ...o, name: name }))
                    setName(-1)
                }
            })
    }

    if (!user) return <></>

    return (
        <div className="flex flex-col items-center justify-center w-full bg-transparent py-4">
            <div className="bg-white shadow-lg rounded-lg overflow-hidden w-96">
                <label htmlFor="img">
                    {user.image || newImage.buffer ? (
                        <div
                            htmlFor="image"
                            className="h-64 w-full rounded-t-lg relative block"
                        >
                            <img
                                className="w-full h-full object-cover"
                                src={
                                    newImage.file ? newImage.buffer : user.image
                                }
                                alt="User Avatar"
                            />
                            <div className="absolute inset-0 bg-transparent opacity-0 hover:opacity-100">
                                {!newImage.file ? (
                                    <>
                                        <FiEdit
                                            title="Change Image"
                                            className="absolute top-2 right-2 w-8 h-8 rounded-md text-xl cursor-pointer text-white bg-black"
                                        />
                                        <CiSquareRemove
                                            title="Remove Image"
                                            className="absolute top-2 right-11 w-8 h-8 rounded-md text-xl cursor-pointer text-white bg-black"
                                            onClick={removeImage}
                                        />
                                    </>
                                ) : (
                                    <>
                                        <RxReset
                                            title="Reset Image"
                                            className="absolute top-2 right-2 w-8 h-8 rounded-md text-xl cursor-pointer text-white bg-black"
                                            onClick={resetImage}
                                        />
                                        <AiOutlineSave
                                            title="Save Image"
                                            className="absolute top-2 right-11 w-8 h-8 rounded-md text-xl cursor-pointer text-white bg-black"
                                            onClick={saveImage}
                                        />
                                    </>
                                )}
                            </div>
                        </div>
                    ) : (
                        <div
                            title="Add Image"
                            className="rounded-t-lg h-64 w-full bg-slate-800 relative"
                        >
                            <RiImageAddLine className="h-full text-slate-300 text-6xl aspect-square absolute left-1/2 -translate-x-1/2" />
                        </div>
                    )}
                </label>
                <input
                    type="file"
                    accept="image/*"
                    id="img"
                    className="hidden"
                    onChange={loadImage}
                />
                <div className="p-6 w-full">
                    <h1 className="text-xl font-bold text-gray-900 relative">
                        {name === -1 ? (
                            <>
                                <span className="h-8">{user.name}</span>
                                <AiOutlineEdit
                                    title="Edit name"
                                    className="absolute top-0 right-0 w-6 aspect-square cursor-pointer hover:text-blue"
                                    onClick={editName}
                                />
                            </>
                        ) : (
                            <form onSubmit={saveName}>
                                <input
                                    className="border-b border-solid border-black h-8 focus:outline-none mb-2"
                                    onChange={e => setName(e.target.value)}
                                    value={name}
                                />
                                <AiOutlineSave
                                    className="absolute top-0 right-0 w-6 aspect-square"
                                    onClick={saveName}
                                />
                            </form>
                        )}
                    </h1>
                    <p className="text-sm text-gray-600">{user.email}</p>

                    <hr className="my-4" />

                    <p className="font-bold text-gray-700">Roles:</p>
                    {user.roles?.length > 0 ? (
                        <ul className="list-disc list-inside">
                            {user.roles?.map((role, idx) => (
                                <li
                                    key={idx}
                                    className="text-sm text-gray-600 mt-2"
                                >
                                    <span className="font-bold">{role}</span>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <span className="text-center block w-full">
                            No roles assigned
                        </span>
                    )}

                    <hr className="my-4" />

                    <p className="font-bold text-gray-700">Linked Accounts</p>
                    {user.accounts?.length > 0 ? (
                        <ul className="list-disc list-inside">
                            {user.accounts.map(account => (
                                <li
                                    key={account._id}
                                    className="text-sm text-gray-600 mt-2"
                                >
                                    <span className="font-bold">
                                        {account.provider
                                            .charAt(0)
                                            .toUpperCase() +
                                            account.provider
                                                .slice(1)
                                                .toLowerCase()}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <span className="text-center block w-full">
                            No accounts linked
                        </span>
                    )}

                    <hr className="my-4" />

                    <div>Change Password</div>
                </div>
            </div>
        </div>
    )
}
