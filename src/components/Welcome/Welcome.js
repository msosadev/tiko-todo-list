import "./Welcome.css";
import { useNavigate } from "react-router-dom";

export default function Welcome() {
  const navigate = useNavigate();
  const accessToken = localStorage.getItem("access_token");

  function LoggedWelcome() {
    return (
      <>
        <p>Access your to-do list with the button below.</p>
        <button onClick={() => navigate("/todo")}>To-do List</button>
      </>
    );
  }

  function NewWelcome() {
    return (
      <>
        <p>Register up or login to access your To-do list.</p>
        <button onClick={() => navigate("/login")} className="button-outline">
          Login
        </button>
        <button onClick={() => navigate("/register")}>Register</button>
      </>
    );
  }

  return (
    <div className="welcome">
      <h1>tiko ToDo List</h1>
      {accessToken ? <LoggedWelcome /> : <NewWelcome />}
    </div>
  );
}
