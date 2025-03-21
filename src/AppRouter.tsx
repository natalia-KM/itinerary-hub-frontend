import { BrowserRouter, Route, Routes } from 'react-router'
import App from './App'
import { Login } from './pages/Login'
import { HomeRedirect } from './pages/HomeRedirect/HomeRedirect'

export const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
            <Route path="/" element={<HomeRedirect/>} />
            <Route path="/dashboard" element={<App/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/logout" element={<Login isLogout={true}/>} />
            </Routes>
        </BrowserRouter>
    )
}