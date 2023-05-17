import { useSelector } from 'react-redux'
import ChartBox from './chartBox'
import { getRelativeTime } from '../../utils/relativeDuration'

export const UserChart = () => {
    const metadata = useSelector(state => state.stats.meta.data)

    return (
        <ChartBox
            obj="users"
            type={0}
            data={{
                datasets: [
                    {
                        data: metadata.map(d => d.users.rootUsers),
                        label: 'Admins',
                    },
                    {
                        data: metadata.map(d => d.users.publisher),
                        label: 'Publishers',
                    },
                    {
                        data: metadata.map(d => d.users.reporters),
                        label: 'Reporters',
                    },
                ],
                labels: metadata.map(d => getRelativeTime(d.createdAt)),
            }}
        />
    )
}

export const ArticleChart = () => {
    const metadata = useSelector(state => state.stats.meta.data)

    return (
        <ChartBox
            obj="articles"
            type={3}
            data={{
                datasets: [
                    {
                        data: metadata.map(d => d.articles.hits),
                        label: 'Total article reads',
                    },
                ],
                labels: metadata.map(d => getRelativeTime(d.createdAt)),
            }}
        />
    )
}

export const AdsChart = () => {
    const metadata = useSelector(state => state.stats.meta.data)

    return (
        <ChartBox
            obj="ads"
            type={0}
            data={{
                datasets: [
                    {
                        data: metadata.map(d => d.ads.hits),
                        label: 'Total ads shown',
                    },
                ],
                labels: metadata.map(d => getRelativeTime(d.createdAt)),
            }}
        />
    )
}

export const CommentsChart = () => {
    const metadata = useSelector(state => state.stats.meta.data)

    return (
        <ChartBox
            obj="comments"
            type={1}
            data={{
                datasets: [
                    {
                        data: metadata.map(d => d.comments.likes),
                        label: 'Total comment interactions',
                    },
                ],
                labels: metadata.map(d => getRelativeTime(d.createdAt)),
            }}
        />
    )
}

export const PollsChart = () => {
    const metadata = useSelector(state => state.stats.meta.data)

    return (
        <ChartBox
            obj="polls"
            type={2}
            data={{
                datasets: [
                    {
                        data: metadata.map(d => d.polls.votes),
                        label: 'Total polls votes',
                    },
                ],
                labels: metadata.map(d => getRelativeTime(d.createdAt)),
            }}
            style={{ width: '100%', height: '100%' }}
        />
    )
}
