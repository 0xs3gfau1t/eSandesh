import { AiFillEdit, AiFillDelete } from "react-icons/ai"

const DashActions = () => {
	return (
		<div className="flex gap-5 text-xl">
			<AiFillEdit className="cursor-pointer hover:text-rose-700 hover:scale-125" />
			<AiFillDelete className="cursor-pointer hover:text-rose-700 hover:scale-125" />
		</div>
	)
}

export default DashActions
