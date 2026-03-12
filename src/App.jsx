import { Routes, Route, Navigate } from "react-router-dom"
import LoginPage from "./auth/LoginPage"
import SignupPage from "./auth/SignupPage"
import Dashboard from "./pages/Dashboard.jsx"
import "./App.css";

function App() {
    return (
        <div className="app">
            <Routes>
                <Route path="/" element={<Navigate to="/login" />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
        </div>
    )
}

export default App