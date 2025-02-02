import Header from "./components/Header.jsx";
import {Route, Routes} from "react-router-dom";
import Register from "./components/Register.jsx";
import Login from "./components/Login.jsx";

export default function App() {
    return (
        <div className="container mt-3">
            <Header/>

            <Routes>
                <Route path="/register" element={<Register/>}/>
                <Route path="/login" element={<Login/>}/>
            </Routes>
        </div>
    )
}
