import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { BsFillPlusSquareFill } from 'react-icons/bs'
import { AiFillDelete, AiFillEdit } from 'react-icons/ai'
import axios from 'axios'

import { Popup, FormText } from '../../components/common'
import { setAlert } from '../../redux/actions/misc'

const initState = {
    name: '',
    email: '',
    password: '',
    isReporter: true,
    canPublish: false,
    isRoot: false,
}

const ManageMods = () => {
    const [show, setShow] = useState(false)
    const [showDel, setDel] = useState(false)
    const [edit, setEdit] = useState(false)
    const [values, setValues] = useState(initState)
    const [mods, setMods] = useState([])
    const dispatch = useDispatch()

    async function getModList() {
        await axios
            .get('/api/user/admin/list')
            .then(res => {
                setMods(res.data.data)
            })
            .catch(err => {
                console.log(err)
                dispatch(setAlert('Something went wrong', 'danger'))
            })
    }

    useEffect(() => {
        getModList()
    }, [])

    const handleChange = e => {
        if (e.target.type == 'checkbox') {
            setValues({ ...values, [e.target.name]: !values[e.target.name] })
        } else setValues({ ...values, [e.target.name]: e.target.value })
    }
    const handleEdit = e => {
        if (edit[e.target.name]) {
            setEdit({ ...edit, [e.target.name]: !edit[e.target.name] })
        } else {
            setEdit({ ...edit, [e.target.name]: true })
        }
    }
    const handleSubmit = async e => {
        if (!values.name || !values.email || !values.password) {
            dispatch(setAlert('One or more field missing!', 'danger'))
            return
        }
        await axios
            .post('/api/user/admin/', values)
            .then(res => {
                dispatch(setAlert('New mod account created', 'success'))
                setValues(initState)
                getModList()
                setShow(false)
            })
            .catch(err => {
                dispatch(setAlert('Something went wrong', 'danger'))
            })
    }
    async function handleDelete() {
        await axios
            .delete('/api/user/admin/', { data: { email: showDel } })
            .then(res => {
                setDel(false)
                getModList()
            })
            .catch(err => {
                console.log('Error')
            })
    }

    async function saveEdit() {
        let data = edit
        Object.keys(data).forEach(el => {
            data[el] = '' + data[el]
        })
        await axios
            .patch('/api/user/admin/', data)
            .then(res => {
                setEdit(false)
                setAlert('Moderator role updated!', 'success')
                getModList()
            })
            .catch(err => {
                setAlert('Something went wrong!', 'danger')
                console.log('Error')
            })
    }

    return (
        <div className="mx-10">
            <div className="addNew" onClick={() => setShow(true)}>
                <BsFillPlusSquareFill className="ml-4 text-[1.8rem] " />
                <h2>Add new mod</h2>
            </div>
            {show && (
                <Popup title={'Create new Mod'} setShow={setShow}>
                    <FormText
                        type="text"
                        name="name"
                        labelText="Name"
                        handleChange={handleChange}
                    />
                    <FormText
                        type="email"
                        name="email"
                        labelText="Email"
                        handleChange={handleChange}
                    />
                    <FormText
                        type="password"
                        name="password"
                        labelText="Password"
                        handleChange={handleChange}
                    />

                    <div className="flex flex-col mb-4">
                        Role
                        <div className="flex gap-8">
                            <div className="flex flex-col">
                                <span>Reporter</span>
                                <input
                                    type={'checkbox'}
                                    name="isReporter"
                                    checked={values.isReporter}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="flex flex-col">
                                <span>Publisher</span>
                                <input
                                    type={'checkbox'}
                                    name="canPublish"
                                    checked={values.canPublish}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="flex flex-col">
                                <span>Root</span>
                                <input
                                    type={'checkbox'}
                                    name="isRoot"
                                    checked={values.isRoot}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                    </div>
                    <button
                        className="bg-darkblue text-white"
                        onClick={handleSubmit}
                    >
                        Save
                    </button>
                </Popup>
            )}
            {showDel && (
                <Popup title={'Are you sure?'} setShow={setDel}>
                    <button
                        className="bg-rose-600 text-white h-10"
                        onClick={handleDelete}
                    >
                        Yes
                    </button>
                    <button
                        className="bg-darkblue text-white ml-8 h-10"
                        onClick={e => setDel(false)}
                    >
                        No
                    </button>
                </Popup>
            )}
            {edit && (
                <Popup title={'Edit Moderator roles'} setShow={edit}>
                    <div className="flex gap-8">
                        <div className="flex flex-col">
                            <span>Reporter</span>
                            <input
                                type={'checkbox'}
                                name="isReporter"
                                checked={
                                    edit.isReporter ? edit.isReporter : false
                                }
                                onChange={handleEdit}
                            />
                        </div>
                        <div className="flex flex-col">
                            <span>Publisher</span>
                            <input
                                type={'checkbox'}
                                name="canPublish"
                                checked={
                                    edit.canPublish ? edit.canPublish : false
                                }
                                onChange={handleEdit}
                            />
                        </div>
                        <div className="flex flex-col">
                            <span>Root</span>
                            <input
                                type={'checkbox'}
                                name="isRoot"
                                checked={edit.isRoot ? edit.isRoot : false}
                                onChange={handleEdit}
                            />
                        </div>
                    </div>
                    <div className="flex justify-center mt-4">
                        <button
                            className="bg-rose-600 text-white h-10"
                            onClick={saveEdit}
                        >
                            Yes
                        </button>
                        <button
                            className="bg-darkblue text-white ml-8 h-10"
                            onClick={e => setEdit(false)}
                        >
                            No
                        </button>
                    </div>
                </Popup>
            )}
            <div className="flex flex-col">
                <div className="overflow-x-auto sm:-px-6 lg:-px-8">
                    <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                        <div className="overflow-hidden">
                            <table className="min-w-full text-left text-sm font-light">
                                <thead className="border-b font-medium dark:border-neutral-500">
                                    <tr>
                                        <th scope="col" className="px-6 py-4">
                                            #
                                        </th>
                                        <th scope="col" className="px-6 py-4">
                                            Name
                                        </th>
                                        <th scope="col" className="px-6 py-4">
                                            Email
                                        </th>
                                        <th scope="col" className="px-6 py-4">
                                            Role
                                        </th>
                                        <th scope="col" className="px-6 py-4">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {mods.map((mod, idx) => {
                                        return (
                                            <tr
                                                key={mod.email}
                                                className="border-b dark:border-neutral-500"
                                            >
                                                <td className="whitespace-nowrap px-6 py-4 font-medium">
                                                    {idx + 1}
                                                </td>
                                                <td className="whitespace-nowrap px-6 py-4">
                                                    {mod.name}
                                                </td>
                                                <td className="whitespace-nowrap px-6 py-4">
                                                    {mod.email}
                                                </td>
                                                <td className="whitespace-nowrap px-6 py-4">
                                                    {mod.roles.isRoot
                                                        ? 'Root, '
                                                        : ''}
                                                    {mod.roles.canPublish
                                                        ? 'Publisher, '
                                                        : ''}
                                                    {mod.roles.isReporter
                                                        ? 'Reporter'
                                                        : ''}
                                                </td>
                                                <td className="whitespace-nowrap px-6 py-6">
                                                    <div className="flex gap-2">
                                                        <AiFillEdit
                                                            className="hover:text-rose-700 hover:scale-125 duration-200"
                                                            onClick={e =>
                                                                setEdit({
                                                                    email: mod.email,
                                                                    ...mod.roles,
                                                                })
                                                            }
                                                        />
                                                        <AiFillDelete
                                                            className="hover:text-rose-700 hover:scale-125 duration-200"
                                                            onClick={e =>
                                                                setDel(
                                                                    mod.email
                                                                )
                                                            }
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
        </div>
    )
}

export default ManageMods
