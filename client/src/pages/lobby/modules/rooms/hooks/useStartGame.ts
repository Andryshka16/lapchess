import { useAppSelector } from 'redux/store'
import { useDispatch } from 'react-redux'
import { updateGame, updateGameConfig } from 'pages/lobby/modules/chess/redux/actions'
import { removeRoom } from 'pages/lobby/modules/rooms/redux/actions'
import createDocument from './helpers/createDocument'
import { Room } from 'types'
import { opposite } from 'helpers'

import API from 'api'
import socket from 'socket'
import createTime from './helpers/createTime'

const useStartGame = () => {
    const dispatch = useDispatch()
    const guest = useAppSelector((store) => store.auth.user)

    return async (room: Room) => {
        const gameId = room._id
        const roomColor = room.actualColor

        const color = opposite(roomColor)
        const time = createTime(room.time)

        const [white, black] = color === 'w' ? [guest, room.user] : [room.user, guest]

        const document = createDocument(white, black, time, gameId)

        await API.createGame(document)
        await API.deleteRoom(gameId)

        dispatch(removeRoom(gameId))

        dispatch(updateGameConfig({ gameId, color, time }))
        dispatch(updateGame({ white, black }))

        socket.emit('JOIN_ROOM', gameId)
        socket.emit('DELETE_ROOM', gameId)
        socket.emit('GAME_INITIALIZED', gameId, { white, black })
    }
}

export default useStartGame
