import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BsFillPlusSquareFill } from 'react-icons/bs'
import { ImCancelCircle } from 'react-icons/im'
import { FormText } from '../../components/common'
import { Popup, FormSelect } from '../../components/common'
import { listPolls, createPoll } from '../../redux/actions/polls'

const initState = {
    question: '',
    options: [],
    expiry: 1,
}

export default function PollsMan() {
    const polls = useSelector(state => state.polls.pollsList)
    const [prop, setProp] = useState(initState)
    const [show, setShow] = useState(false)
    const [status, setStatus] = useState('Active')

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(listPolls({ active: status == 'Active' }))
    }, [status])

    const addOption = e => {
        e.preventDefault()
        setProp(oldProp => ({
            ...oldProp,
            options: [...oldProp.options, ''],
        }))
    }

    const changeOption = (idx, val) => {
        setProp(oldProp => ({
            ...oldProp,
            options: oldProp.options.map((option, i) =>
                i == idx ? val : option
            ),
        }))
    }

    const deleteOption = idx => {
        setProp(oldProp => ({
            ...oldProp,
            options: oldProp.options.filter((_, i) => i != idx),
        }))
    }

    const onSubmit = e => {
        e.preventDefault()
        dispatch(createPoll(prop))
        setProp(initState)
        setTimeout(() => {
            setShow(false)
        }, 3000)
    }

    const handleChange = e =>
        setProp(o => ({ ...o, [e.target.name]: e.target.value }))

    return (
        <div className="mx-8">
            <div className="addNew" onClick={() => setShow(true)}>
                <BsFillPlusSquareFill className="ml-4 text-[1.8rem] " />
                <h2>Add new poll</h2>
            </div>
            {show && (
                <Popup title={'Add new Poll'} setShow={setShow}>
                    <FormText
                        type="text"
                        name="question"
                        value={prop.question}
                        labelText="Question"
                        handleChange={handleChange}
                    />
                    <FormText
                        type="text"
                        name="expiry"
                        value={prop.expiry}
                        labelText="Expires In (days)"
                        handleChange={handleChange}
                    />
                    {prop.options.map((option, idx) => (
                        <div className="relative" key={idx}>
                            <input
                                className="focus:outline-none form-input w-full py-1 px-2 rounded-md border-[1px] border-[#FFBD03] mb-2"
                                type="text"
                                value={option}
                                onChange={e =>
                                    changeOption(idx, e.target.value)
                                }
                            />
                            <ImCancelCircle
                                className="absolute left-full top-full -translate-x-[150%] -translate-y-[200%] cursor-pointer h-1/2 aspect-square rounded-full"
                                onClick={() => deleteOption(idx)}
                            />
                        </div>
                    ))}
                    <div className="flex gap-8 text-base place-content-center">
                        <button
                            className="bg-darkblue text-white"
                            onClick={addOption}
                        >
                            Add Option
                        </button>
                        <button
                            className="bg-darkblue text-white "
                            onClick={onSubmit}
                        >
                            Save
                        </button>
                    </div>
                </Popup>
            )}
            <div className="w-fit">
                <FormSelect
                    handleChange={e => setStatus(e.target.value)}
                    options={['Active', 'Ended']}
                    labelText="Choose status"
                />
            </div>
            <div className="flex flex-col">
                <div className="overflow-x-auto">
                    <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                        <div className="overflow-hidden">
                            <table className="newsListTable min-w-full table-auto">
                                <thead className="border-b">
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Question</th>
                                        <th scope="col">Responses</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {polls &&
                                        polls.map((poll, index) => {
                                            return (
                                                <tr
                                                    key={index}
                                                    className="border-b"
                                                >
                                                    <td>{`${index + 1}`}</td>
                                                    <td>{poll.question}</td>
                                                    <td>
                                                        {poll.options.map(
                                                            option => (
                                                                <div
                                                                    key={
                                                                        option._id
                                                                    }
                                                                >
                                                                    <span className="font-semibold">
                                                                        {
                                                                            option.text
                                                                        }
                                                                    </span>
                                                                    :
                                                                    <span className="ml-2">
                                                                        {
                                                                            option.votes
                                                                        }
                                                                    </span>
                                                                </div>
                                                            )
                                                        )}
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
