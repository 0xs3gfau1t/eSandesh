import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai'

export default function ({ page, setPage }) {
    return (
        <div className="flex justify-center space-x-32">
            <AiOutlineArrowLeft
                className="hover:cursor-pointer hover:scale-125"
                onClick={() => setPage(page - 1)}
            />
            <p>{'Page ' + page}</p>
            <AiOutlineArrowRight
                className="hover:cursor-pointer hover:scale-125"
                onClick={() => setPage(page + 1)}
            />
        </div>
    )
}
