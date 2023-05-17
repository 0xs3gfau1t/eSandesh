import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { listPolls, votePoll } from '../../redux/actions/polls'

const Polls = ({ session }) => {
    const polls = useSelector(state => state.polls.pollsList)
    const dispatch = useDispatch()
    const now = new Date()
    const [active, setActive] = useState(true)

    useEffect(() => {
        dispatch(listPolls({ active: active }))
    }, [active])

    const castVote = (e, poll, opt) => {
        if (poll.voted == -1) {
            dispatch(votePoll({ poll: poll._id, option: opt }))
        }
    }

    if (session.status === 'unauthenticated') {
        return <h1>You must log in to view this page</h1>
    }

    return (
        <div className="container mx-auto p-8">
            <div className="flex gap-16">
                <h1
                    onClick={e => setActive(true)}
                    className={`${
                        active ? 'border-b-2 border-b-stone-600' : ''
                    } text-3xl font-bold mb-8 cursor-pointer`}
                >
                    आजको प्रश्न
                </h1>
                <h1
                    onClick={e => setActive(false)}
                    className={`${
                        !active ? 'border-b-2 border-b-stone-600' : ''
                    } text-3xl font-bold mb-8 cursor-pointer`}
                >
                    मत परिणामहरु
                </h1>
            </div>
            <div className="grid gap-6">
                {polls &&
                    polls.map(poll => {
                        let diff =
                            (new Date(poll.expiry) - now) /
                            (24 * 60 * 60 * 1000)
                        return (
                            <div
                                key={poll._id}
                                className={`${
                                    poll.voted != -1
                                        ? 'pointer-events-none'
                                        : 'pointer-events-auto'
                                } border border-gray-300 rounded-lg p-6 flex flex-col`}
                            >
                                <h2 className="text-xl font-bold mb-4">
                                    {poll.question}
                                </h2>
                                {poll.options.map((opt, optNo) => (
                                    <div
                                        key={opt._id}
                                        className="flex items-center mb-2"
                                    >
                                        <div
                                            className={`cursor-pointer flex-grow py-2 px-4 rounded-md font-bold ${
                                                poll.voted == optNo
                                                    ? 'bg-green-500 text-white'
                                                    : 'bg-white text-gray-700'
                                            }`}
                                            onClick={e =>
                                                castVote(e, poll, opt._id)
                                            }
                                        >
                                            {opt.text}
                                        </div>

                                        <span className="ml-4 text-gray-600">
                                            {poll.voted != -1 || poll.expired
                                                ? `${
                                                      opt.votes
                                                          ? opt.votes
                                                          : '0'
                                                  } मत`
                                                : ''}
                                        </span>
                                    </div>
                                ))}
                                <span
                                    className={`rounded ${
                                        diff < 0
                                            ? 'bg-rose-700 text-white'
                                            : 'bg-stone-400'
                                    } mx-auto p-1 mt-4`}
                                >
                                    {diff > 0 &&
                                        `मतदान सकिन ${
                                            diff > 1
                                                ? Math.round(diff) + ' दिन'
                                                : (diff * 24).toPrecision(2) +
                                                  ' घण्टा'
                                        } बाँकी।`}
                                    {diff < 0 && 'अन्तिम परिणाम'}
                                </span>
                            </div>
                        )
                    })}
            </div>
        </div>
    )
}

export default Polls
