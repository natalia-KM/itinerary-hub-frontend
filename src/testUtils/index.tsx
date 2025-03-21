import { PropsWithChildren } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const getQueryClient = () => {
    return new QueryClient({
        defaultOptions: {
            queries: {
                retry: false,
                refetchOnMount: false,
                refetchOnReconnect: false,
                refetchOnWindowFocus: false
            }
        }
    })
}
export const userContextAndQueryWrapper = ({ children }: PropsWithChildren) => (
    <QueryClientProvider client={getQueryClient()}>
        {children}
    </QueryClientProvider>
)

