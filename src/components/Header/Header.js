import "./Header.css";
import logoTiko from "../../img/logo_tiko.svg";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  const accessToken = localStorage.getItem("access_token");
  function logOut() {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    navigate("/");
  }

  return (
    <header className="main-header">
      <img onClick={() => navigate('/')}  src={logoTiko} alt="Tiko logo" />
      <div>
        {accessToken ? (
          <button onClick={logOut} className="button-error">
            Log out
          </button>
        ) : (
          ""
        )}
      </div>
    </header>
  );
}
