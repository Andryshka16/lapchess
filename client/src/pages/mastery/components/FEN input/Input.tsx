import { useState, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from 'redux/store'
import convertToFEN from './helpers/Convert to FEN/convertToFEN'
import convertFromFEN from './helpers/Convert from FEN/convertFromFEN'
import { setChessBoard } from 'pages/mastery/store/masterySlice'

const Input = () => {
    const dispatch = useAppDispatch()
    const { chessBoard } = useAppSelector((store) => store.mastery)

    const [fen, setFen] = useState<string>('')

    useEffect(() => {
        setFen(convertToFEN(chessBoard))
    }, [chessBoard.gameField])

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault()
                const chessBoard = convertFromFEN(fen)
                if (chessBoard) dispatch(setChessBoard(chessBoard))
            }}
        >
            <input
                type='text'
                className='mt-2 w-full rounded-lg bg-black bg-opacity-10 px-5 py-1 focus:outline-none'
                value={fen}
                onChange={(e) => setFen(e.target.value)}
            />
        </form>
    )
}

export default Input