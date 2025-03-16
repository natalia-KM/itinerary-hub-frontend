import {BrowserRouter, Route, Routes} from "react-router";
import App from "./App";
import {Login} from "./Login";

export const MyRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
            <Route path="/" element={<App/>} />
            <Route path="/dashboard" element={<App/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/logout" element={<Login isLogout={true}/>} />
            </Routes>
        </BrowserRouter>
    )
}