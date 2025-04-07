import { PropsWithChildren } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient =  new QueryClient({
    defaultOptions: {
        queries: {
            retry: false,
            refetchOnMount: false,
            refetchOnReconnect: false,
            refetchOnWindowFocus: false,
            enabled: false
        }
    }
})

export const userContextAndQueryWrapper = ({ children }: PropsWithChildren) => (
    <QueryClientProvider client={queryClient}>
        {children}
    </QueryClientProvider>
)

