import { AiOutlineInfoCircle } from 'react-icons/ai'

const CountBox = ({ Icon, count, title, info, ...rest }) => {
    return (
        <div
            className="h-full w-64 rounded-md p-4 flex flex-col gap-1 cursor-pointer shadow-sm shadow-black relative"
            {...rest}
        >
            <div className="bg-white rounded-md h-9 w-9 p-1 block ">
                <Icon className="w-full h-full p-1 text-black" />
            </div>
            <div>
                <span className="block text-white font-semibold">{count}</span>
                <span className="text-gray-200 font-mono">{title}</span>
            </div>
            <AiOutlineInfoCircle
                className="absolute bottom-2 right-2 fill-white hover:text-xl"
                title={info}
            />
        </div>
    )
}

export default CountBox
