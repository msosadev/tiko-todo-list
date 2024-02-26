import "./App.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Todo from "./components/Todo/Todo";
import Welcome from "./components/Welcome/Welcome";
import Home from "./components/Home/Home";
// import { verifyAccessToken } from "./components/authService";
import { useEffect, useState } from "react";
import { TokenContext } from "./components/tokenContext";
import {
  getValueWithTimestamp,
  setValueWithTimestamp,
} from "./components/authService";

function App() {
  // Setting tokenContext as state to be able to change the tokens in the children
  const localAccessToken = getValueWithTimestamp("accessToken").value || null;
  const localRefreshToken = getValueWithTimestamp("refreshToken").value || null;

  const setAccessToken = (token) => {
    setTokenState((prevState) => ({
      ...prevState,
      access: token,
    }));

    setValueWithTimestamp("accessToken", token);
  };

  const setRefreshToken = (token) => {
    setTokenState((prevState) => ({
      ...prevState,
      refresh: token,
    }));

    setValueWithTimestamp("refreshToken", token);
  };

  const [tokenState, setTokenState] = useState({
    access: localAccessToken,
    refresh: localRefreshToken,
  });

  const value = { tokenState, setAccessToken, setRefreshToken };

  // Token verification and refreshing on load

  const verifyAccessToken = async () => {
    const api = "https://todos-api.public.tiko.energy/api/token/verify/";
    const accessToken = tokenState.access;
    const data = { token: accessToken };

    if (accessToken !== null) {
      try {
        const response = await fetch(api, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        if (response.ok) {
          return true; // Successfully verified the token
        } else {
          console.error(
            "Error verifying token. Server returned an error:",
            response.status
          );
          return false; // Failed to verify the token
        }
      } catch (error) {
        console.error("Error verifying token:", error);
        return false; // Failed to verify the token
      }
    }
  };

  const refreshAccessToken = async () => {
    const api = "https://todos-api.public.tiko.energy/api/token/refresh/";
    const refreshToken = tokenState.refresh;
    const data = {
      refresh: refreshToken,
    };

    if (refreshToken !== null) {
      fetch(api, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((result) => {
          setAccessToken(result.access);
        })
        .catch((error) => {
          console.error("Error during refresh:", error);
        });
    }

    setupAccessRefresh();
  };

  function calculateTokenLifetime(token) {
    const timestamp = getValueWithTimestamp(token).timestamp;
    let expirationTime;
    if (token === "acessToken") {
      expirationTime = new Date(timestamp).getTime() + 3600000; // 1 hour in milliseconds
    } else {
      expirationTime = new Date(timestamp).getTime() + 86400000; // 1 hour in milliseconds
    }
    const currentTime = new Date().getTime();
    return expirationTime - currentTime;
  }

  async function setupAccessRefresh() {
    const accessTokenSuccess = await verifyAccessToken();

    if (tokenState.access) {
      if (!accessTokenSuccess) {
        refreshAccessToken();
      } else {
        const timeToExpiration = calculateTokenLifetime("accessToken");
        const refreshThreshold = 1 * 60 * 1000; // 1 minute in milliseconds

        // Set up a timer to refresh the token before it expires
        if (timeToExpiration > refreshThreshold) {
          setTimeout(() => {
            console.log("Refreshing token before expiration...");
            refreshAccessToken();
          }, timeToExpiration - refreshThreshold);
        }
      }
    }
  }

  async function setupRefreshTokenLifetime() {
    const timeToExpiration = calculateTokenLifetime("refreshToken");
    const refreshThreshold = 1 * 60 * 1000; // 1 minute in milliseconds

    // Set up a timer to refresh the token before it expires
    if (timeToExpiration > refreshThreshold) {
      setTimeout(() => {
        console.log("Refresh token expired, login out");
        setAccessToken(null);
        setRefreshToken(null);
      }, timeToExpiration - refreshThreshold);
    }
  }

  useEffect(() => {
    setupAccessRefresh();
    setupRefreshTokenLifetime();
  }, []);

  return (
    <div className="App">
      <TokenContext.Provider value={value}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />}>
              <Route path="/" element={<Welcome />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route
                path="/todo"
                element={
                  tokenState.access ? <Todo /> : <Navigate to="/register" />
                }
              />
            </Route>
          </Routes>
        </BrowserRouter>
      </TokenContext.Provider>
    </div>
  );
}

export default App;
