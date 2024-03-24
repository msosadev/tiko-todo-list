import "./Header.css";
import logoTiko from "../../img/logo_tiko.svg";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { TokenContext } from "../tokenContext";

export default function Header() {
  const navigate = useNavigate();
  const { tokenState, setAccessToken, setRefreshToken } = useContext(TokenContext);
  const accessToken = tokenState.access;
  
  function clickLogOut() {
    setAccessToken(null);
    setRefreshToken(null);
    navigate("/");
  }

  return (
    <header className="main-header">
      <img onClick={() => navigate("/")} src={logoTiko} alt="Tiko logo" />
      <div>
        {/* Shows logout button if accessToken exists. Technically the token should also be verified but this is handled in App.js where if the accessToken fails to refresh, the user gets logged out */}
        {accessToken ? (
          <button onClick={clickLogOut} className="button-error">
            Log Out
          </button>
        ) : (
          ""
        )}
      </div>
    </header>
  );
}
