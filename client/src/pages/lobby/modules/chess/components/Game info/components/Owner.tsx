import GuestAvatar from 'assets/images/Guest.png'
import { useAppSelector } from 'redux/store'
import Timer from './Time/Timer'

const Owner = () => {
    const white = useAppSelector((store) => store.chess.white)
    const black = useAppSelector((store) => store.chess.black)
    const color = useAppSelector((store) => store.chess.color)

    const user = color === 'w' ? white : black

    const username = user?.username || 'Guest'
    const avatar = user?.avatar || GuestAvatar

    return (
        <div className='flex w-full items-center justify-between p-4'>
            <div className='flex items-center'>
                <img src={avatar} className='h-8 w-8 rounded-full object-cover' alt='' />
                <h3 className='ml-3 text-lg font-medium'>{username}</h3>
            </div>
            <Timer color={color as 'w' | 'b'} />
        </div>
    )
}

export default Owner
