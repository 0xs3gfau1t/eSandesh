import React from 'react'
import { Link } from 'react-router-dom'

export default function Subscription() {
    return (
        <div>
            <h2 className="font-bold text-base font-english leading-loose">
                Subscriptions
            </h2>
            <p>
                Your <span className="font-bold">weekly newsletter</span>{' '}
                subscription is currently{' '}
                <span className="font-bold">active</span>.{' '}
                <span className="text-red font-bold">
                    <Link to="">Unsubscribe here</Link>.
                </span>
            </p>
        </div>
    )
}
