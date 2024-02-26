import { useContext } from "react";
import "./Welcome.css";
import { useNavigate } from "react-router-dom";
import { TokenContext } from "../tokenContext";

export default function Welcome() {
  const navigate = useNavigate();
  const { tokenState, setAccessToken, setRefreshToken } = useContext(TokenContext);

  function accessHandler() {
    setAccessToken("i have been accessed");
  }

  function refreshHandler() {
    setRefreshToken("i have been refreshed");
  }

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
      <p onClick={refreshHandler}>Refresh token: {tokenState.refresh}</p>
      <p onClick={accessHandler}>Access token: {tokenState.access}</p>
      <h1>tiko To-do List</h1>
      {tokenState.access ? <LoggedWelcome /> : <NewWelcome />}
    </div>
  );
}
