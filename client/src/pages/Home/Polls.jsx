import { useSession } from "next-auth/react"

const Polls = () => {
	const { data: session, status } = useSession()

	if (status == "unauthenticated") {
		return <h1>You must login to view this page</h1>
	}

	return (
		<div>
			<h1 className="text-3xl font-bold underline-offset-8 underline">
				आजको प्रश्न
			</h1>
			<div className="m-6">
				<h1 className="text-2xl">विश्वकप कसले जित्ला त ? </h1>
			</div>
		</div>
	)
}

export default Polls
