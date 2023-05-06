import { use, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { listPolls, votePoll } from '../../redux/actions/polls'

const Polls = ({ session }) => {
    const polls = useSelector(state => state.polls.pollsList)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(listPolls())
    }, [])

    const castVote = (e, poll, opt, index) => {
        if (!polls[index].casted)
            dispatch(votePoll({ poll: poll, option: opt }))
    }

    if (session.status == 'unauthenticated') {
        return <h1>You must login to view this page</h1>
    }

    return (
        <div>
            <h1 className="text-3xl font-bold underline-offset-8 underline">
                आजको प्रश्न
            </h1>
            <div className="m-6 flex flex-col">
                {polls &&
                    polls.map((poll, index) => {
                        return (
                            <ul
                                key={index}
                                className="flex flex-col gap-4 w-max"
                            >
                                <h1 className="text-2xl">{poll.question}</h1>
                                {poll.options.map((opt, indexx) => {
                                    return (
                                        <li
                                            key={indexx}
                                            className={`${
                                                opt.voted
                                                    ? 'bg-green-700'
                                                    : 'bg-sky-500'
                                            } py-2 pl-4 rounded-md cursor-pointer`}
                                            onClick={e =>
                                                castVote(
                                                    e,
                                                    poll._id,
                                                    opt._id,
                                                    index
                                                )
                                            }
                                        >
                                            {opt.text}{' '}
                                        </li>
                                    )
                                })}
                            </ul>
                        )
                    })}
            </div>
        </div>
    )
}

export default Polls
