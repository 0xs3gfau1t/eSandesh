import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { RiImageAddLine } from 'react-icons/ri'
import { FiEdit } from 'react-icons/fi'
import { HiOutlineDocumentRemove } from 'react-icons/hi'
import { RxReset } from 'react-icons/rx'
import { AiOutlineEdit, AiOutlineSave } from 'react-icons/ai'
import { setAlert } from '../../redux/actions/misc'
import { useAxiosError } from '../../utils/useAxiosError'
import { formatString } from '../../utils/formatString'
import { RiLockPasswordFill } from 'react-icons/ri'
import { FcGoogle } from 'react-icons/fc'
import { signIn } from 'next-auth/react'

const PASSWORD_INIT_VALUES = {
    current: '',
    new: '',
    confirm: '',
    editing: false,
    show: false,
}

export default function UserInfo() {
    const [user, setUserData] = useState()
    const [newImage, setNewImage] = useState({ file: null, buffer: null })
    const [name, setName] = useState(-1)
    const [password, setPassword] = useState(PASSWORD_INIT_VALUES)

    const { dispatch, onError } = useAxiosError()

    useEffect(() => {
        axios
            .get('/api/user/')
            .then(res => setUserData(res.data.userInfo))
            .catch(onError)
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
                    setUserData(o => ({ ...o, image: res.data.image }))
                    setNewImage({ file: null, buffer: null })
                    dispatch(setAlert('New image set', 'success'))
                }
            })
            .catch(onError)
    }

    const removeImage = e => {
        e.stopPropagation()
        e.preventDefault()
        axios
            .delete('/api/user/image', { withCredentials: true })
            .then(res => {
                if (res.status == 200) {
                    setUserData(o => ({ ...o, image: res.data.image }))
                    setNewImage({ file: null, buffer: null })
                    dispatch(setAlert('Image removed', 'success'))
                }
            })
            .catch(onError)
    }

    const startEditingName = () => setName(user.name)

    const saveName = e => {
        e.preventDefault()
        if (!name) return
        axios
            .post('/api/user/', { name: name }, { withCredentials: true })
            .then(res => {
                if (res.status == 200) {
                    setUserData(o => ({ ...o, name: name }))
                    setName(-1)
                    dispatch(setAlert('New name set', 'success'))
                }
            })
            .catch(onError)
    }

    const changePasswordValue = e => {
        setPassword(o => ({ ...o, [e.target.name]: e.target.value }))
        if (e.target.name == 'confirm')
            e.target.setCustomValidity(
                e.target.value != password.new ? 'Passwords donot match' : ''
            )
        else if (e.target.name == 'new')
            e.target.setCustomValidity(
                e.target.value === password.current
                    ? 'New password cannot be same as old password'
                    : ''
            )
    }
    const startPasswordChange = () =>
        setPassword({ ...PASSWORD_INIT_VALUES, editing: true })
    const cancelPasswordChange = () => setPassword(PASSWORD_INIT_VALUES)
    const savePasswordChange = e => {
        e.preventDefault()
        axios
            .post('/api/user/', {
                password: password.new,
                currentPassword:
                    user.password == 1 ? password.current : undefined,
            })
            .then(res => {
                if (res.status == 200) {
                    setPassword(PASSWORD_INIT_VALUES)
                    dispatch(
                        setAlert('Password changed successfully', 'success')
                    )
                    setUserData(o => ({ ...o, password: 1 }))
                }
            })
            .catch(onError)
    }

    if (!user) return <></>

    return (
        <div className="flex flex-col items-center justify-center w-full bg-transparent py-4">
            <div className="bg-white shadow-lg rounded-lg w-96">
                <label htmlFor="img" className="block w-full aspect-square">
                    {user.image || newImage.buffer ? (
                        <div
                            htmlFor="image"
                            className="h-full w-full rounded-t-lg relative"
                        >
                            <img
                                className="w-full h-full object-cover rounded-t-lg"
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
                                        <HiOutlineDocumentRemove
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
                <div className="p-6 w-full flex flex-col gap-4">
                    <div>
                        <h1 className="text-xl font-bold text-gray-900 relative">
                            {name === -1 ? (
                                <>
                                    <span className="h-8">{user.name}</span>
                                    <AiOutlineEdit
                                        title="Edit name"
                                        className="absolute top-0 right-0 w-6 aspect-square cursor-pointer hover:text-blue"
                                        onClick={startEditingName}
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
                    </div>

                    {Object.keys(user.roles)?.length > 0 && (
                        <>
                            <hr className="" />
                            <div>
                                <p className="font-bold text-gray-700">
                                    Roles:
                                </p>
                                <ul className="list-disc list-inside">
                                    {Object.keys(user.roles)?.map(
                                        (role, idx) => (
                                            <li
                                                key={idx}
                                                className="text-sm text-gray-600 mt-2"
                                            >
                                                <span className="font-bold">
                                                    {role}
                                                </span>
                                            </li>
                                        )
                                    )}
                                </ul>
                            </div>
                        </>
                    )}

                    <hr className="" />

                    <div className="flex justify-around">
                        <div
                            className={`bg-white rounded-md border border-solid border-gray-500 shadow-sm whitespace-nowrap px-4 py-2 flex gap-2 w-fit items-center ${user.google
                                    ? 'cursor-default'
                                    : 'cursor-pointer'
                                }`}
                            onClick={() =>
                                user.google
                                    ? undefined
                                    : signIn('google', {
                                        callbackUrl: window.location,
                                    })
                            }
                        >
                            <FcGoogle className="w-6 h-6" />
                            <span className="align-middle text-base">
                                {user.google ? 'Connected' : 'Connect'}
                            </span>
                        </div>

                        <div
                            className="bg-white rounded-md border-solid border-gray-500 shadow-md whitespace-nowrap px-4 py-2 cursor-pointer text-sm"
                            onClick={startPasswordChange}
                        >
                            {user.password == 1
                                ? 'Change Password'
                                : 'Set Password'}
                        </div>
                    </div>

                    {password.editing && (
                        <>
                            <hr className="" />
                            <form
                                className="text-sm grid grid-cols-[5rem,auto] grid-rows-2 items-center gap-y-2"
                                onReset={cancelPasswordChange}
                                onSubmit={savePasswordChange}
                            >
                                {user.password == 1 && (
                                    <>
                                        <label
                                            htmlFor="current"
                                            className="block"
                                        >
                                            Current
                                        </label>
                                        <input
                                            className="border-solid border-b border-black focus:outline-none "
                                            placeholder="Enter your current password"
                                            type={
                                                password.show
                                                    ? 'text'
                                                    : 'password'
                                            }
                                            id="current"
                                            name="current"
                                            value={password.current}
                                            onChange={changePasswordValue}
                                            required
                                        />
                                    </>
                                )}
                                <label htmlFor="new" className="block">
                                    New
                                </label>
                                <input
                                    className="border-solid border-b border-black focus:outline-none "
                                    placeholder="Enter your new password"
                                    type={password.show ? 'text' : 'password'}
                                    id="new"
                                    name="new"
                                    value={password.new}
                                    onChange={changePasswordValue}
                                    required
                                />
                                <label htmlFor="confirm" className="block">
                                    Confirm
                                </label>
                                <input
                                    className="border-solid border-b border-black focus:outline-none"
                                    placeholder="Retype your password"
                                    type={password.show ? 'text' : 'password'}
                                    id="confirm"
                                    name="confirm"
                                    value={password.confirm}
                                    onChange={changePasswordValue}
                                    required
                                />
                                <div className="col-span-2 flex flex-row-reverse gap-2">
                                    <label htmlFor="show">Show Password</label>
                                    <input
                                        type="checkbox"
                                        id="show"
                                        name="show"
                                        checked={password.show}
                                        onChange={e =>
                                            setPassword(o => ({
                                                ...o,
                                                show: e.target.checked,
                                            }))
                                        }
                                        className="col-span-2 flex flex-row-reverse gap-2"
                                    />
                                </div>
                                <div className="col-span-2 flex flex-row-reverse gap-2">
                                    <input
                                        type="reset"
                                        value="Cancel"
                                        className="cursor-pointer"
                                    />
                                    <input
                                        type="submit"
                                        value="Save"
                                        className="cursor-pointer"
                                    />
                                </div>
                            </form>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}
