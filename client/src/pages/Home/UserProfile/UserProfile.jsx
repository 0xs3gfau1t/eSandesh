import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useSession } from "next-auth/react"
import { setFocus } from "../../../redux/reducers/misc"

import UserInfo from "./UserInfo"
import UserPreference from "./UserPreference"
import Subscription from "./Subscription"
import SavedPosts from "./SavedPosts"
import UserPosts from "./UserPosts"
import { listSavedArticles } from "../../../redux/actions/user"

const UserProfile = () => {
	const session_user = useSession()
	const [showProfile, setShowProfile] = useState(false);
	const dispatch = useDispatch()


	useEffect(()=>{
		console.log(session_user)
	}, [session_user])


	useEffect(() => {
		dispatch(setFocus(true))
		dispatch(listSavedArticles(session_user?.data.user.id))
	}, [])


	if (session_user.status == "unauthenticated") {
		return (
			<h1 className="text-3xl font-bold">You must login to view this page</h1>
		)
	}

	return (
		<div className="font-english p-4 flex flex-col ">
			<div className="flex justify-between items-center">
				<p className = 'font-semibold'>Hello, {session_user?.data?.user.name || 'loading'}</p>
				<button className=" bg-primary w-64 p-2 rounded"
						onClick ={()=> setShowProfile(!showProfile)}>
					Set Your User Profile
				</button>
				{showProfile && (
					<div className="fixed content-center inset-y-0 right-0">
						<div className="p-4 bg-white rounded shadow-lg w-max ">
							<h1 className="font-english underline underline-offset-2 leading-loose font-bold text-center text-3xl text-darkblue">
								User Profile
							</h1>
							<UserInfo />
							<hr className=" w-11/12 my-6 border-neutral-300" />
							<button
							className="text-red p-2 rounded hover:text-white hover:bg-red duration-200"
							onClick={() => setShowProfile(false)}
							>
							Close
							</button>
						</div>
					</div>
				)}
			</div>
			{/* <hr className=" w-11/12 my-6 border-neutral-300" />
			<UserPreference /> */}
			<hr className=" w-11/12 my-6 border-neutral-300" />
			<UserPosts />
			<hr className=" w-11/12 my-6 border-neutral-300" />
			<SavedPosts />
			<hr className=" w-11/12 my-6 border-neutral-300" />
			<Subscription />
		</div>
	)
}

export default UserProfile
