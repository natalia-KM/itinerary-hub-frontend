import {useCallback} from "react";
import webClient from "../../config/clientConfig";
import {useMutation} from "@tanstack/react-query";
import {queryKeys} from "../../config/queryKeys";

export const useSignInWithGoogle = () => {

    const signIn = useCallback(async () => {
        await webClient.post('/oauth2/authorization/google')
    }, [])

    return useMutation({
        mutationKey: [queryKeys.signInWithGoogle],
        mutationFn: signIn
    })
}