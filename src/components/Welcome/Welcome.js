import { useContext } from "react";
import { setValueWithTimestamp } from "../authService";
import "./Welcome.css";
import { useNavigate } from "react-router-dom";
import { LocalAccessToken, LocalRefreshToken } from "../tokenContext";

export default function Welcome() {
  const navigate = useNavigate();
  const accessToken = useContext(LocalAccessToken);
  const localAccessToken = useContext(LocalAccessToken);
  const localRefreshToken = useContext(LocalRefreshToken);

  function logTokens() {
    console.log(localAccessToken, localRefreshToken);
  }

  function setTokens() {
    setValueWithTimestamp("accessToken", "1234");
    setValueWithTimestamp("refreshToken", "5678");
  }

  function LoggedWelcome() {
    return (
      <>
        <p onClick={setTokens}>Access your to-do list with the button below.</p>
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
      <h1 onClick={logTokens}>tiko ToDo List</h1>
      {accessToken ? <LoggedWelcome /> : <NewWelcome />}
    </div>
  );
}
