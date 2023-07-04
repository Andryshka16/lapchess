import { useForm } from 'react-hook-form'
import { LoginFormValues } from '../../types/FormValues'
import { passwordValidation, usernameValidation } from './Validation'
import { useAppDispatch, useAppSelector } from 'redux/store'
import { login } from 'pages/sign in/redux/actions'
import InputError from '../shared/InputError'

const initialStyles =
    'mb-7 block h-12 w-full border-b-2 font-medium border-b-gray-500 bg-transparent p-2 focus:outline-none transition duration-200'

const errorStyles =
    'mb-7 block h-12 w-full border-b-2 font-medium border-b-red-500 bg-transparent p-2 focus:outline-none transition duration-200'

interface LoginProps {
    showSignUp: boolean
    setShowSighUp: React.Dispatch<React.SetStateAction<boolean>>
}

const Login = ({ showSignUp, setShowSighUp }: LoginProps) => {
    const dispatch = useAppDispatch()
    const { loading } = useAppSelector((store) => store.auth)

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<LoginFormValues>({ mode: 'onSubmit' })

    const onSubmit = async (data: LoginFormValues) => {
        dispatch(login(data))
    }

    const inputsTabIndex = showSignUp ? -1 : 0

    return (
        <form
            className='relative flex h-[700px] w-[500px] items-center'
            onSubmit={handleSubmit(onSubmit)}
            tabIndex={inputsTabIndex}
        >
            <div className='w-full px-10'>
                <h1 className='mb-10 text-center text-5xl font-semibold'>Log in</h1>

                <input
                    type='text'
                    placeholder='Username'
                    className={errors['username'] ? errorStyles : initialStyles}
                    tabIndex={inputsTabIndex}
                    {...register('username', usernameValidation)}
                />
                <InputError error={errors['username']} />

                <input
                    type='password'
                    placeholder='Password'
                    className={errors['password'] ? errorStyles : initialStyles}
                    tabIndex={inputsTabIndex}
                    {...register('password', passwordValidation)}
                />
                <InputError error={errors['password']} />

                <button
                    type='submit'
                    className={`mx-auto mt-16 block h-10 w-28 rounded-md bg-blue-500 text-xl font-semibold transition duration-200 ${
                        loading
                            ? 'pointer-eventts-none opacity-60'
                            : 'pointer-events-all hover:bg-opacity-80'
                    }`}
                >
                    Log in
                </button>
            </div>
            <p
                className='absolute bottom-0 mb-10 w-full cursor-pointer text-center text-lg font-medium text-gray-300'
                onClick={() => setShowSighUp(true)}
            >
                Not a member? Sign in to become one.
            </p>
        </form>
    )
}

export default Login
