import "./Login.css";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TokenContext } from "../tokenContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setAccessToken, setRefreshToken } = useContext(TokenContext);

  async function submitHandler() {
    setLoading(true);

    const data = {
      email: email,
      password: password,
    };

    try {
      // Make a POST request to the login endpoint
      const response = await fetch(
        "https://todos-api.public.tiko.energy/api/login/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      const result = await response.json();
      const accessToken = result.access;
      const refreshToken = result.refresh;

      setAccessToken(accessToken);
      setRefreshToken(refreshToken);

      if (!loading) {
        navigate("/todo");
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  }

  return (
    <div className="login-wrapper">
      <form className="login">
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
        <button type="button" onClick={submitHandler}>
          Login {loading ? "(Loading)" : ""}
        </button>
      </form>
    </div>
  );
}
