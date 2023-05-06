import { useState, useEffect } from 'react'
import { BsFillPlusSquareFill } from 'react-icons/bs'
import { AiFillDelete, AiFillEdit } from 'react-icons/ai'
import axios from 'axios'

import { Popup, FormText, FormSelect } from '../../components/common'

const initState = { name: '', email: '', role: 'isReporter' }

const ManageMods = () => {
    const [show, setShow] = useState(false)
    const [showDel, setDel] = useState(false)
    const [values, setValues] = useState(initState)
    const [mods, setMods] = useState([])

    async function getModList() {
        await axios
            .get('/api/user/admin/list')
            .then(res => {
                // console.log(res.data)
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
        setValues({ ...values, [e.target.name]: e.target.value })
    }

    const handleSubmit = e => {
        e.prevendDefault()
        console.log('Submitted')
    }
    async function handleDelete(email) {
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
                        name="question"
                        labelText="Name"
                        handleChange={handleChange}
                    />
                    <FormText
                        type="email"
                        name="email"
                        labelText="Email"
                        handleChange={handleChange}
                    />
                    <FormSelect
                        name={'role'}
                        hint="Choose a role"
                        defaultV={'isReporter'}
                        labelText={'Role'}
                        options={['isRoot', 'canPublish', 'isReporter']}
                        handleChange={handleChange}
                    />
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
            <div className="flex flex-col">
                <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
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
                                                        ? 'isRoot'
                                                        : mod.roles.canPublish
                                                        ? 'canPublish'
                                                        : 'isReporter'}
                                                </td>
                                                <td className="whitespace-nowrap px-6 py-6">
                                                    <div className="flex gap-2">
                                                        <AiFillEdit className="hover:text-rose-700 hover:scale-125 duration-200" />
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
