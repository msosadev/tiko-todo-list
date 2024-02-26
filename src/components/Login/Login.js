import "./Login.css";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TokenContext } from "../tokenContext";
import { postApi } from "../authService";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setAccessToken, setRefreshToken } = useContext(TokenContext);

  // When form submits, send form data to api
  async function submitHandler(e) {
    e.preventDefault();
    setLoading(true);

    const data = {
      email: email,
      password: password,
    };

    // Sends data to the api to get the tokens as response
    postApi(data, "login")
      .then((result) => {
        // If the server sends back the tokens, stores them in tokenContext to have them available globally
        setAccessToken(result.access);
        setRefreshToken(result.refresh);
        if (result.access && result.refresh) {
          navigate("/todo");
        }
        setLoading(false);
      })
      .catch(() => {
        alert("No active account found with the given credentials");
        setLoading(false);
      });
  }

  return (
    <div className="login-wrapper">
      <form onSubmit={submitHandler} className="login">
        <h1>Login</h1>
        <input
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          autoComplete="email"
          type="email"
          name="email"
          id="email"
          placeholder="Email"
        />
        <input
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          autoComplete="current-password"
          type="password"
          name="password"
          id="password"
          placeholder="Password"
        />
        <button>Login {loading ? "(Loading)" : ""}</button>
      </form>
    </div>
  );
}
