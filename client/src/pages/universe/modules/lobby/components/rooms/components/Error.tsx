import error from 'assets/error.png'
import { useAppDispatch } from 'redux/store'
import { fetchRooms } from '../../../store/lobbySlice'

const RoomsError = () => {
    const dispatch = useAppDispatch()
    return (
        <div className='flex h-[636px] w-full items-center justify-center rounded-lg bg-black bg-opacity-10 p-2.5'>
            <div>
                <img src={error} className='mx-auto h-40 w-40' alt='' />
                <h1 className='mx-auto mb-16 mt-10 w-fit text-center text-4xl font-semibold leading-normal'>
                    Error while fetching games <br /> Please try again later.
                </h1>
                <button
                    className='mx-auto block rounded-md bg-green-600 px-10 py-2 text-xl font-semibold'
                    onClick={() => dispatch(fetchRooms())}
                >
                    Retry
                </button>
            </div>
        </div>
    )
}
export default RoomsError
