import { useContext } from "react";
import "./Welcome.css";
import { Link } from "react-router-dom";
import { TokenContext } from "../tokenContext";

export default function Welcome() {
  const { tokenState } = useContext(TokenContext);

  function LoggedWelcome() {
    return (
      <>
        <p>Access your to-do list with the button below.</p>
        <br></br>
        <Link className="button" to={"/todo"}>To-do List</Link>
      </>
    );
  }

  function NewWelcome() {
    return (
      <>
        <p>Register or login to access your To-do list.</p>
        <br></br>
        <Link className="button button-outline" to={"/login"}>Login</Link>
        <Link className="button" to={"/register"}>Register</Link>
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
