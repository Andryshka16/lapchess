import { useState, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from 'redux/store'
import { handleMove, selectPiece } from 'pages/lobby/redux/actions'
import { applyDraggingStyle, unApplyDraggingStyle } from './helpers'
import { Coordinates } from 'types'

interface Dragging {
    element: HTMLElement
    coordinates: number[]
    startingPosition: number[]
}

const useStartDragging = (k: number) => {
    const dispatch = useAppDispatch()
    const {
        position,
        chessBoard: { nextMoves, selected }
    } = useAppSelector((store) => store.lobby.chess)

    const [dragging, setDragging] = useState<null | Dragging>(null)

    const following = (event: MouseEvent) => {
        const { element, coordinates, startingPosition } = dragging as Dragging

        const [x1, y1] = coordinates
        const [startingX, startingY] = startingPosition

        const difX = k * (event.clientX - startingX)
        const difY = k * (event.clientY - startingY)

        element.style.left = `${element.clientWidth * x1 + difX}px`
        element.style.top = `${element.clientWidth * y1 + difY}px`
    }

    const unFollow = (event: MouseEvent) => {
        setDragging(null)

        const { element, coordinates, startingPosition } = dragging as Dragging

        const [x1, y1] = coordinates
        const [startingX, startingY] = startingPosition

        const difX = k * (event.clientX - startingX)
        const difY = k * (event.clientY - startingY)

        const x2 = Math.round(x1 + difX / element.clientWidth)
        const y2 = Math.round(y1 + difY / element.clientWidth)

        unApplyDraggingStyle(element)

        if (nextMoves.includesDeeply([x2, y2])) {
            const { x: x1, y: y1 } = selected as Coordinates
            const movePayload = [
                [x1, y1],
                [x2, y2]
            ]
            dispatch(handleMove(movePayload))
        }
    }

    useEffect(() => {
        if (dragging) {
            const { element } = dragging
            applyDraggingStyle(element)

            window.addEventListener('mousemove', following)
            window.addEventListener('mouseup', unFollow)
        }

        return () => {
            window.removeEventListener('mousemove', following)
            window.removeEventListener('mouseup', unFollow)

            if (dragging) {
                const { element } = dragging
                unApplyDraggingStyle(element)
            }
        }
    }, [dragging])

    useEffect(() => {
        setDragging(null)
    }, [position])

    return (element: HTMLElement, coordinates: number[], startingPosition: number[]) => {
        const [x1, y1] = coordinates
        dispatch(selectPiece({ x: x1, y: y1 }))
        setDragging({
            element,
            coordinates,
            startingPosition
        })
    }
}

export default useStartDragging
