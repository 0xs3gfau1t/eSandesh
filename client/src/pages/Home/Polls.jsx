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
        if (!polls[index].casted) {
            dispatch(votePoll({ poll: poll, option: opt }))
        }
    }

    const getOptionPercentage = option => {
        const totalVotes = option.votes
        const maxVotes = Math.max(
            ...polls.flatMap(poll => poll.options.map(opt => opt.votes))
        )
        return maxVotes === 0 ? 0 : Math.round((totalVotes / maxVotes) * 100)
    }

    if (session.status === 'unauthenticated') {
        return <h1>You must log in to view this page</h1>
    }

    return (
        <div className="container mx-auto p-8">
            <h1 className="text-3xl font-bold mb-8">आजको प्रश्न</h1>
            <div className="grid gap-6">
                {polls &&
                    polls.map((poll, index) => (
                        <div
                            key={index}
                            className="border border-gray-300 rounded-lg p-6"
                        >
                            <h2 className="text-xl font-bold mb-4">
                                {poll.question}
                            </h2>
                            {poll.options.map(opt => (
                                <div
                                    key={opt._id}
                                    className="flex items-center mb-2 relative"
                                >
                                    <div
                                        className={`cursor-pointer z-40 flex-grow py-2 px-4 rounded-md font-bold ${
                                            opt.voted
                                                ? 'bg-green-500 text-white'
                                                : 'bg-white text-gray-700'
                                        }`}
                                        disabled={polls[index].casted}
                                        onClick={e =>
                                            castVote(
                                                e,
                                                poll._id,
                                                opt._id,
                                                index
                                            )
                                        }
                                    >
                                        {opt.text}
                                    </div>

                                    <span className="ml-4 text-gray-600">
                                        {opt.users} votes
                                    </span>
                                </div>
                            ))}
                        </div>
                    ))}
            </div>
        </div>
    )
}

export default Polls
