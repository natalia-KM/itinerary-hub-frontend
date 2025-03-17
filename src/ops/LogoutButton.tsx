import { useLogout } from '../hooks/useLogout/useLogout'

export const LogoutButton = () => {
    const { mutateAsync: logout } = useLogout()

    return (
        <>
            <button onClick={() => logout()}>LOGOUT</button>
        </>
    )
}