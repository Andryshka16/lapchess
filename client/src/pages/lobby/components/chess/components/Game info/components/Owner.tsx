import GuestAvatar from 'assets/images/Guest.png'
import { useAppSelector } from 'redux/store'

const Owner = () => {
    const { white, black, color } = useAppSelector((store) => store.lobby.chess)

    const user = color === 'w' ? white : black

    const username = user?.username || 'Guest'
    const avatar = user?.avatar || GuestAvatar

    return (
        <div className='flex w-full items-center justify-between p-4'>
            <div className='flex items-center'>
                <img src={avatar} className='h-8 w-8 rounded-full object-cover' alt='' />
                <h3 className='ml-3 text-lg font-medium'>{username}</h3>
            </div>
            <div className='flex h-8 w-20 items-center justify-center rounded-md bg-white bg-opacity-5 text-xl font-semibold'>
                5 + 3
            </div>
        </div>
    )
}

export default Owner
