import "./Header.css";
import logoTiko from "../../img/logo_tiko.svg";
import { useNavigate } from "react-router-dom";
import { logOut } from "../authService";
import { useContext } from "react";
import { LocalAccessToken } from "../tokenContext";

export default function Header() {
  const navigate = useNavigate();
  const accessToken = useContext(LocalAccessToken);
  function clickLogOut() {
    logOut();
    navigate("/");
  }

  return (
    <header className="main-header">
      <img onClick={() => navigate('/')}  src={logoTiko} alt="Tiko logo" />
      <div>
        {accessToken ? (
          <button onClick={clickLogOut} className="button-error">
            Log out
          </button>
        ) : (
          ""
        )}
      </div>
    </header>
  );
}
