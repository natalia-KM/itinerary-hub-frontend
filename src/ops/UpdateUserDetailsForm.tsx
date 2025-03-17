import { useState } from 'react'
import { useUpdateUserDetails } from 'hooks/useUpdateUserDetails/useUpdateUserDetails'
import { useUserDetailsContext } from 'provider/UserDetailsProvider/useUserDetailsContext'


export const UpdateUserDetailsForm = () => {
    const [response, setResponse] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const { mutateAsync: updateUserDetails } = useUpdateUserDetails()
    const { invalidateUserDetails } = useUserDetailsContext()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (firstName === '' || lastName === '') {
            alert('Enter info')
            return
        }

        await updateUserDetails({ firstName, lastName }).then((response) => {
            setResponse(`Name: ${response.firstName} ${response.lastName}, isGuest: ${response.isGuest}`)
            invalidateUserDetails()
        })
    }

    return (
        <div style={{ padding: '10px', border: '1px solid black' }}>
            <h4>UPDATE USER DETAILS FORM</h4>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-4 max-w-sm mx-auto">
                <input
                    type="text"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="border p-2 rounded"
                />
                <input
                    type="text"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="border p-2 rounded"
                />
                <button type="submit" className="bg-blue-500 text-white p-2 rounded">Submit</button>
            </form>
            <p>Response : {response}</p>
        </div>
    )
}