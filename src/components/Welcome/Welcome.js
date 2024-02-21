import "./Welcome.css";

export default function Welcome() {
    return (
        <div className="welcome">
            <h1>Tiko ToDo List</h1>
            <p>Sign up or login to access your ToDo list.</p>
            <button className="button-outline">Login</button>
            <button>Sign up</button>
        </div>
    )
}