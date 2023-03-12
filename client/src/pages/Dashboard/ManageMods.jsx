import { useState, useEffect } from 'react'
import { BsFillPlusSquareFill } from 'react-icons/bs'
import axios from 'axios'

import { Popup, FormText, FormSelect } from '../../components/common'

const initState = { name: '', email: '', role: 'isReporter' }
const ManageMods = () => {
    const [show, setShow] = useState(false)
    const [values, setValues] = useState()
    const [mods, setMods] = useState([])
    async function getModList() {
        await axios
            .get('/api/user/admin/list')
            .then(res => {
                console.log(res.data)
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
            <div class="flex flex-col">
                <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div class="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                        <div class="overflow-hidden">
                            <table class="min-w-full text-left text-sm font-light">
                                <thead class="border-b font-medium dark:border-neutral-500">
                                    <tr>
                                        <th scope="col" class="px-6 py-4">
                                            #
                                        </th>
                                        <th scope="col" class="px-6 py-4">
                                            Name
                                        </th>
                                        <th scope="col" class="px-6 py-4">
                                            Email
                                        </th>
                                        <th scope="col" class="px-6 py-4">
                                            Role
                                        </th>
                                        <th scope="col" class="px-6 py-4">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {mods.map((mod, idx) => {
                                        return (
                                            <tr class="border-b dark:border-neutral-500">
                                                <td class="whitespace-nowrap px-6 py-4 font-medium">
                                                    {idx + 1}
                                                </td>
                                                <td class="whitespace-nowrap px-6 py-4">
                                                    {mod.name}
                                                </td>
                                                <td class="whitespace-nowrap px-6 py-4">
                                                    {mod.email}
                                                </td>
                                                <td class="whitespace-nowrap px-6 py-4">
                                                    {mod.roles.isRoot
                                                        ? 'isRoot'
                                                        : mod.roles.canPublish
                                                        ? 'canPublish'
                                                        : 'isReporter'}
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
