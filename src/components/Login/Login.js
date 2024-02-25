import { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { setValueWithTimestamp } from "../authService";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function submitHandler() {
    const data = {
      email: email,
      password: password,
    };

    // Make a POST request to the login endpoint
    fetch("https://todos-api.public.tiko.energy/api/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((result) => {
        const accessToken = result.access;
        const refreshToken = result.refresh;

        if (accessToken && refreshToken) {
          setValueWithTimestamp("accessToken", accessToken);
          setValueWithTimestamp("refreshToken", refreshToken);
          navigate("/todo");
        }
      })
      .catch((error) => {
        console.error("Error during login:", error);
      });
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
          Login
        </button>
      </form>
    </div>
  );
}
