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

      if (!response.ok) {
        // If the response status is not OK, throw an error
        throw new Error("Login failed");
      }

      const result = await response.json();
      const accessToken = result.access;
      const refreshToken = result.refresh;

      // If the server sends back the tokens, stores them in tokenContext to have them available globally
      setAccessToken(accessToken);
      setRefreshToken(refreshToken);

      // Once it finished loading, navigate to the to-do list
      if (!loading) {
        navigate("/todo");
      }
    } catch (error) {
      alert("Login failed. Please check your credentials and try again.");
      console.error("Error during login:", error);
    } finally {
      setLoading(false);
    }
  }

  // Handler to allow submitting with enter
  const handleKeyPress = async (event) => {
    if (event.key === "Enter") {
      submitHandler();
    }
  };

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
          onKeyDown={handleKeyPress}
        />
        <input
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          autoComplete="current-password"
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          onKeyDown={handleKeyPress}
        />
        <button type="button" onClick={submitHandler}>
          Login {loading ? "(Loading)" : ""}
        </button>
      </form>
    </div>
  );
}
