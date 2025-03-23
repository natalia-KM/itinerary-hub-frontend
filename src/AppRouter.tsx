import { BrowserRouter, Route, Routes } from 'react-router'
import { Login } from './pages/Login'
import { HomeRedirect } from './pages/HomeRedirect/HomeRedirect'
import { TripsView } from './pages/TripsView/TripsView'
import { HelpPage } from './pages/HelpPage/HelpPage'

export const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
            <Route path="/" element={<HomeRedirect/>} />
            <Route path="/dashboard" element={<TripsView/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/logout" element={<Login isLogout={true}/>} />
            <Route path="/help" element={<HelpPage/>} />
            </Routes>
        </BrowserRouter>
    )
}