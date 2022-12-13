import {
	EmailShareButton,
	FacebookShareButton,
	LineShareButton,
	LinkedinIcon,
	LinkedinShareButton,
	RedditShareButton,
	TelegramShareButton,
	TwitterShareButton,
	ViberShareButton,
	WhatsappShareButton,
} from "react-share"
import { FacebookIcon, TwitterIcon, RedditIcon } from "react-share"
import { BsFillSaveFill } from "react-icons/bs"
import { useDispatch } from "react-redux"

import { saveNews } from "../../redux/actions/publicNews"

const SocialShare = ({ title, id }) => {
	const url = document.location.href
	const dispatch = useDispatch()

	const saveSave = e => {
		// console.log(id)
		dispatch(saveNews({ id: id }))
	}

	return (
		<div className="flex ">
			<h1 className="font-bold py-3">Share this news</h1>
			<FacebookShareButton
				quote={title}
				url={url}
				hashtag={["#esandesh"]}
				className="social-share"
			>
				<FacebookIcon size={28} />
			</FacebookShareButton>

			<TwitterShareButton
				title={title}
				url={url}
				hashtags={["eSandesh"]}
				className="social-share"
			>
				<TwitterIcon size={28} />
			</TwitterShareButton>

			<RedditShareButton title={title} className="social-share">
				<RedditIcon size={28} />
			</RedditShareButton>

			<LineShareButton title={title} className="social-share">
				<LinkedinIcon size={28} />
			</LineShareButton>

			<BsFillSaveFill
				className="social-share text-3xl ml-4 my-3 text-darkblue cursor-pointer"
				onClick={saveSave}
			/>
		</div>
	)
}

export default SocialShare
