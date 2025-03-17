import { useDeleteAccount } from '../hooks/useDeleteAccount/useDeleteAccount'
import { useUserDetailsContext } from '../provider/UserDetailsProvider/useUserDetailsContext'

export const DeleteAccount = () => {
    const { mutateAsync } = useDeleteAccount()
    const { invalidateUserDetails } = useUserDetailsContext()

    const deleteAccount = async () => {
        await mutateAsync().then(() => {
            invalidateUserDetails()
        })
    }

    return (
        <>
            <button onClick={deleteAccount}>DELETE ACCOUNT</button>
        </>
    )
}