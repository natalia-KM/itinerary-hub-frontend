import { BrowserRouter, Route, Routes } from 'react-router'
import { Login } from './pages/Login'
import { HomeRedirect } from './pages/HomeRedirect/HomeRedirect'
import { TripsView } from './pages/TripsView/TripsView'
import { HelpPage } from './pages/HelpPage/HelpPage'
import { TripDetailsPage } from './pages/TripDetails/TripDetailsPage'
import { Components } from './pages/Components'
import { PrintableTripPage } from './pages/PrintableTripPage/PrintableTripPage'
import { TripStateProvider } from './provider/TripStateProvider/TripStateProvider'
import { PrivacyPolicyPage } from './pages/PrivacyPolicy'

export const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomeRedirect/>}/>
                <Route path="/dashboard" element={<TripsView/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/logout" element={<Login/>}/>
                <Route path="/help" element={<HelpPage/>}/>
                <Route path="/privacy-policy" element={<PrivacyPolicyPage/>}/>
                <Route path="/trip" element={
                    <TripStateProvider>
                        <TripDetailsPage/>
                    </TripStateProvider>
                }/>
                <Route path="/trip/print" element={<PrintableTripPage />} />
                <Route path="/components" element={<Components/>}/>
            </Routes>
        </BrowserRouter>
    )
}