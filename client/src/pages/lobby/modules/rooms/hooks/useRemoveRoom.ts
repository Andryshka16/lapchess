import { useAppDispatch } from 'redux/store'
import { removeRoom } from 'pages/lobby/modules/rooms/redux/actions'
import { updateGameId } from 'pages/lobby/modules/chess/redux/actions'
import { deleteRoomQuery } from 'api/rooms'
import { useShowAlert } from 'ui/components/Alert/hooks'
import socket from 'socket'

const useRemoveRoom = () => {
    const dispatch = useAppDispatch()
    const alert = useShowAlert()

    return async (_id: string) => {
        try {
            await deleteRoomQuery(_id)
            socket.emit('DELETE_ROOM', _id)

            dispatch(removeRoom(_id))
            dispatch(updateGameId(null))

            alert('Successfully deleted room', 'success')
        } catch (error) {
            alert('Error deleting room', 'error')
        }
    }
}

export default useRemoveRoom
