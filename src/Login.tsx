import { useState } from "react";
import { useSignInWithGoogle } from "./hooks/useSignInWithGoogle/useSignInWithGoogle";
import {useSignUpAsGuest} from "./hooks/useSignUpAsGuest/useSignUpAsGuest";
import {useUserDetailsContext} from "./provider/UserDetailsProvider/useUserDetailsContext";
import {BASE_API_PATH} from "./config/envConfig";

export const Login = ({ isLogout = false }: { isLogout?: boolean }) => {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const { mutateAsync: signUpAsGuest } = useSignUpAsGuest()
    const { invalidateUserDetails } = useUserDetailsContext()

    const signIn = () => {
        window.location.href = `${BASE_API_PATH}/oauth2/authorization/google`
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (firstName === '' || lastName === '') {
            alert("Enter info")
            return
        }
        await signUpAsGuest({ firstName, lastName }).then(() => invalidateUserDetails())
    };

    return (
        <div style={{ minHeight: '80vh', padding: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
            {isLogout && <h1>Logged Out!!</h1>}
            <button onClick={signIn}>Login with Google</button>

            <p>Or Continue as Guest</p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-4 max-w-sm mx-auto" style={{ gap: '5px', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
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
        </div>
    )
}