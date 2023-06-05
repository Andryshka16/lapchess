import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from 'redux/store'
import { LoginFormValues } from '../types/form fields/LoginFormValues'
import axios, { isAxiosError } from 'axios'
import { authenticate } from 'pages/sign in/store/authSlice'
import { setThisRoom } from 'pages/universe/modules/lobby/store/lobbySlice'
import { User } from 'pages/sign in/types/User'
import { showAlert } from 'layout/alert/store/alertSlice'

const SERVER_URL = import.meta.env.VITE_SERVER_URL

interface Response {
    user: User
    room: string
}

const useLogin = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const alert = (text: string, type: string) => dispatch(showAlert({ text, type }))

    return async (data: LoginFormValues) => {
        try {
            const response = await axios.post<Response>(`${SERVER_URL}/users/login`, data)
            const { user, room } = response.data

            dispatch(authenticate(user))
            dispatch(setThisRoom(room))
            navigate('/')
        } catch (error) {
            if (isAxiosError(error)) {
                alert(error.response?.data || 'An error occured while trying to log in.', 'error')
            }
        }
    }
}

export default useLogin