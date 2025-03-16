import {useSignInWithGoogle} from "../hooks/useSignInWithGoogle/useSignInWithGoogle";

export const LinkToGoogleAccount = () => {
    const { mutateAsync: signInWithGoogle } = useSignInWithGoogle()

    return (
        <>
            <p>Login</p>
            <button onClick={() => signInWithGoogle()}>Login with Google</button>
        </>
    )
}