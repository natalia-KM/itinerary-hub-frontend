import {UpdateUserDetailsForm} from "./UpdateUserDetailsForm";
import {LogoutButton} from "./LogoutButton";
import {DeleteAccount} from "./DeleteAccount";
import React from "react";
import {useUserDetailsContext} from "../provider/UserDetailsProvider/useUserDetailsContext";
import {useSignInWithGoogle} from "../hooks/useSignInWithGoogle/useSignInWithGoogle";
import {BASE_API_PATH} from "../config/envConfig";

export const Controls = () => {
    const { userDetails, invalidateUserDetails } = useUserDetailsContext()
    const { mutateAsync: signInWithGoogle } = useSignInWithGoogle()

    const signIn = () => {
        window.location.href = `${BASE_API_PATH}/oauth2/authorization/google`
    }

    const linkAccount = async () => {
        await signInWithGoogle().then(() => {
            invalidateUserDetails()
        })
    }

    return (
        <div>
            {userDetails?.isGuest && (
                <button onClick={signIn}>Link Account to Google</button>
            )}

            <UpdateUserDetailsForm/>

            <LogoutButton/>

            <DeleteAccount/>
        </div>
    )
}