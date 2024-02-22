import { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function submitHandler() {
    const data = {
      email: email,
      password: password,
    };

    // function setCookie(name, value, expirationDays) {
    //     const date = new Date();
    //     date.setTime(date.getTime() + (expirationDays * 24 * 60 * 60 * 1000));
    //     const expires = "expires=" + date.toUTCString();
    //     document.cookie = name + "=" + value + ";" + expires + ";path=/;Secure;HttpOnly";
    // }

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
        console.log(result);
        const accessToken = result.access;
        const refreshToken = result.refresh;

        if (accessToken && refreshToken) {
          localStorage.setItem("access_token", accessToken);
          localStorage.setItem("refresh_token", refreshToken);
          navigate("/todo");
        }
        // setCookie('access_token', accessToken, 1);
        // setCookie('refresh_token', refreshToken, 7);
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
