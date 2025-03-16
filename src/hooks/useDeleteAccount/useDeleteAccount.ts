import {useCallback} from "react";
import webClient from "../../config/clientConfig";
import {useMutation} from "@tanstack/react-query";
import {queryKeys} from "../../config/queryKeys";

export const useDeleteAccount = () => {

    const deleteAccount = useCallback(async () => {
        await webClient.delete('/v1/users').then((result) => {
            if(result.status === 204) {
                window.location.href = '/login'
            }
        })
    }, [])

    return useMutation({
        mutationKey: [queryKeys.deleteUser],
        mutationFn: deleteAccount
    })
}