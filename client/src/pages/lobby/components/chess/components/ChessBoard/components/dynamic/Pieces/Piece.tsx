import { useAppDispatch, useAppSelector } from 'redux/store'
import { getPieceStyle } from 'config/styles'
import { handleMove } from 'pages/lobby/redux/actions'
import useStartDragging from './hooks/useStartDragging'
import { findPiece } from 'helpers'

interface PieceProps {
    piece: string
}

export const Piece = ({ piece }: PieceProps) => {
    const dispatch = useAppDispatch()
    const { color, chessBoard, position, positionHistory } = useAppSelector(
        (store) => store.lobby.chess
    )

    const startDragging = useStartDragging(color === 'w' ? 1 : -1)

    const { turn, nextMoves, gameField, selected } = chessBoard

    const coordinates = findPiece(piece, gameField)

    if (!coordinates) return null

    const [x, y] = coordinates
    const name = gameField[y][x].slice(0, 2)

    const allowPointerEvents =
        position + 1 === positionHistory.length &&
        color === turn &&
        (name[0] === turn || nextMoves.includesDeeply([x, y]))

    const pointerEvents = allowPointerEvents ? 'pointer-events-all' : 'pointer-events-none'
    const isReversed = color === 'b' ? 'rotate-180' : ''

    const handleMouseClick = (event: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
        if (selected && nextMoves.includesDeeply([x, y])) {
            const { x: x1, y: y1 } = selected
            const movePayload = [
                [x1, y1],
                [x, y]
            ]
            dispatch(handleMove(movePayload))
        } else if (turn === name[0]) {
            const startingPosition = [event.clientX, event.clientY]
            startDragging(event.currentTarget, coordinates, startingPosition)
        }
    }

    return (
        <img
            src={`pieces/${name}.png`}
            className={`${getPieceStyle(name[1], x, y)} ${pointerEvents} ${isReversed} `}
            onMouseDown={(e) => e.button === 0 && handleMouseClick(e)}
        />
    )
}
