import { useContext } from "react";
import "./Welcome.css";
import { useNavigate } from "react-router-dom";
import { TokenContext } from "../tokenContext";

export default function Welcome() {
  const navigate = useNavigate();
  const { tokenState } = useContext(TokenContext);

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
      <h1>tiko To-do List</h1>

      {/* Shows a different screen depending on if the user is logged in or not */}
      {tokenState.access ? <LoggedWelcome /> : <NewWelcome />}
    </div>
  );
}
