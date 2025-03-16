import {useCallback} from "react";
import webClient from "../../config/clientConfig";
import {useQuery} from "@tanstack/react-query";
import {UserDetails} from "./types";
import {queryKeys} from "../../config/queryKeys";

export const useGetUserDetails = () => {

    const getUserDetails = useCallback(async () => {
        const { data } = await webClient.get<UserDetails>('/v1/users')
        return data
    }, [])

    return useQuery({
        queryKey: [queryKeys.getUserDetails],
        queryFn: getUserDetails
    })
}