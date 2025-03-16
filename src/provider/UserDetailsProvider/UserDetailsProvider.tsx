import { useEffect, useState} from "react";
import {useGetUserDetails} from "../../hooks/useGetUserDetails/useGetUserDetails";
import {UserDetails} from "../../hooks/useGetUserDetails/types";
import {UserDetailsContext} from "./UserDetailsContext";
import {useQueryClient} from "@tanstack/react-query";
import {queryKeys} from "../../config/queryKeys";

interface UserDetailsProviderProps {
    children: React.ReactNode
}

export const UserDetailsProvider = ({ children }: UserDetailsProviderProps) => {
    const { data: response } = useGetUserDetails();
    const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
    const queryClient = useQueryClient();

    useEffect(() => {
        if (response) {
            setUserDetails(response);
        }
    }, [response]);

    const invalidateUserDetails = () => {
        queryClient.invalidateQueries({ queryKey: [queryKeys.getUserDetails] })
    }

    return (
        <UserDetailsContext.Provider value={{ userDetails, invalidateUserDetails}}>
            {children}
        </UserDetailsContext.Provider>
    );
}