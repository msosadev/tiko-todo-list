import "./Welcome.css";
import { useNavigate } from "react-router-dom";

export default function Welcome() {
    const navigate = useNavigate();
    return (
        <div className="welcome">
            <h1>Tiko ToDo List</h1>
            <p>Register up or login to access your To-do list.</p>
            <button onClick={() => navigate('/login')} className="button-outline">Login</button>
            <button onClick={() => navigate('/register')}>Register</button>
        </div>
    )
}