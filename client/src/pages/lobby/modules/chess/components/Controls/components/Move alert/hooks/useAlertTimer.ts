import { useAppDispatch, useAppSelector } from 'redux/store'
import useCalculateAlertTime from './useCalculateAlertTime'
import { useEffect, useState } from 'react'
import { cancelGame } from 'pages/lobby/modules/chess/redux/actions'
import { cancelGameQuery } from 'api/chess games'
import socket from 'socket'

const useAlertTimer = () => {
    const dispatch = useAppDispatch()

    const gameId = useAppSelector((store) => store.chess.gameId)
    const cancelled = useAppSelector((store) => store.chess.status.cancelled)
    const turn = useAppSelector((store) => store.chess.chessBoard.turn)

    const calculateTime = useCalculateAlertTime()
    const [time, setTime] = useState(calculateTime())

    useEffect(() => {
        setTime(calculateTime())
        if (time !== null) {
            if (time > 0) {
                const interval = setInterval(() => setTime(calculateTime()), 1000)
                return () => clearInterval(interval)
            } else if (!cancelled) {
                dispatch(cancelGame())
                cancelGameQuery(gameId)
                socket.emit('CANCEL_GAME', gameId)
            }
        }
    }, [turn, time])

    return time
}

export default useAlertTimer
