import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import reportWebVitals from './reportWebVitals'
import { AppRouter } from './AppRouter'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './config/queryClient'
import { UserDetailsProvider } from './provider/UserDetailsProvider/UserDetailsProvider'
import { ToastContainer } from 'react-toastify'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)
root.render(
  <React.StrictMode>
      <QueryClientProvider client={queryClient}>
          <UserDetailsProvider>
            <AppRouter />
              <ToastContainer
                  position='top-right'
                  theme='light'
              />
          </UserDetailsProvider>
      </QueryClientProvider>
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
