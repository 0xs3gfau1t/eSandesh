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

const SocialShare = ({ title }) => {
	const url = document.location.href

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
		</div>
	)
}

export default SocialShare
