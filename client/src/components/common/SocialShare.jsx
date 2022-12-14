import {
	FacebookShareButton,
	LinkedinIcon,
	LinkedinShareButton,
	RedditShareButton,
	TwitterShareButton,
} from "react-share"
import { FacebookIcon, TwitterIcon, RedditIcon } from "react-share"
import { AiFillSave } from "react-icons/ai"
import { FaLink } from "react-icons/fa"
import { useDispatch } from "react-redux"

const SocialShare = ({ title, id }) => {
	const url = document.location.href
	const dispatch = useDispatch()

	const saveSave = e => {
		// console.log(id)
		dispatch(saveNews({ id: id }))
	}

	return (
		<div className="flex gap-2 items-center">
			<p className="font-bold">यो खबर सेयर गर्नुहोस्:</p>
			<div className="flex items-center">
				{/* group of social media icons */}
				<div title={"Post to Facebook"}>
					<FacebookShareButton
						quote={title}
						url={url}
						hashtag={["#esandesh"]}
						className="social-share"
					>
						<FacebookIcon size={28} />
					</FacebookShareButton>
				</div>
				<div title={"Tweet this article"}>
					<TwitterShareButton
						url={url}
						hashtags={["eSandesh"]}
						className="social-share"
					>
						<TwitterIcon size={28} />
					</TwitterShareButton>
				</div>
				<div title={"Share to Reddit"}>
					<RedditShareButton className="social-share">
						<RedditIcon size={28} />
					</RedditShareButton>
				</div>
				<div title="Share to LinkedIn">
					<LinkedinShareButton className="social-share">
						<LinkedinIcon size={28} />
					</LinkedinShareButton>
				</div>
			</div>
			{/* share by link */}
			<FaLink
				className="my-auto w-6 h-6 cursor-pointer hover:text-blue duration-200"
				title="Copy Link"
			/>
			{/* <AiFillSave
				className="my-auto w-6 h-6 cursor-pointer hover:text-blue duration-200"
				title="Save this article"
				onClick={saveSave}
			/> */}
		</div>
	)
}

export default SocialShare
