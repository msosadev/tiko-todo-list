import "./App.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Todo from "./components/Todo/Todo";
import Welcome from "./components/Welcome/Welcome";
import Home from "./components/Home/Home";
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

  // Changes the access token while leaving the refresh token as is
  const setAccessToken = (token) => {
    setTokenState((prevState) => ({
      ...prevState,
      access: token,
    }));

    setValueWithTimestamp("accessToken", token);
  };

  // Changes the refresh token while leaving the access token as is
  const setRefreshToken = (token) => {
    setTokenState((prevState) => ({
      ...prevState,
      refresh: token,
    }));

    setValueWithTimestamp("refreshToken", token);
  };

  // Setting a global tokenState
  const [tokenState, setTokenState] = useState({
    access: localAccessToken,
    refresh: localRefreshToken,
  });

  // value is passed to tokenContext provider to make it available to children components
  const value = { tokenState, setAccessToken, setRefreshToken };

  // ----- Token verification and refreshing on load ----- //

  // Accepts "accessToken" or "refreshToken", calculates the remaining lifespan of a token based on when the timestamp was set on local storage
  function calculateTokenLifetime(token) {
    const timestamp = getValueWithTimestamp(token).timestamp;
    let expirationTime;
    if (token === "acessToken") {
      expirationTime = new Date(timestamp).getTime() + 3600000; // The access token has a lifetime of 1 hour, written in milliseconds
    } else {
      expirationTime = new Date(timestamp).getTime() + 86400000; // The refresh token has a lifetime of 1 day, written in milliseconds
    }
    const currentTime = new Date().getTime();
    return expirationTime - currentTime; // Returns the remaining lifespan of a token in milliseconds
  }

  function logOut(message) {
    console.log(message);
    setAccessToken(null);
    setRefreshToken(null);
  }

  // Makes an api request to verify the accessToken, returns true or false
  const verifyAccessToken = async () => {
    const api = "https://todos-api.public.tiko.energy/api/token/verify/";
    const accessToken = getValueWithTimestamp("accessToken").value;
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

  // Makes an api call to refresh the access token
  const refreshAccessToken = async () => {
    const api = "https://todos-api.public.tiko.energy/api/token/refresh/";
    const refreshToken = tokenState.refresh;
    const data = {
      refresh: refreshToken,
    };

    if (refreshToken !== null) {
      try {
        const response = await fetch(api, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        if (response.ok) {
          const result = await response.json();
          setAccessToken(result.access); // Token successfully refreshed
          setupAccessRefresh(); // Trigger setupAccessRefresh only if the API call was successful
        } else {
          console.error(
            "Error during refresh. Server returned an error:",
            response.status
          );
          logOut("Unable to refresh token, login out.") // If the access token fails, the user gets logged out
        }
      } catch (error) {
        console.error("Error during refresh:", error);
      }
    }

    // This function allows continuously refreshing the access token as long as the refresh token is valid
  };

  // Sets up a timeOut based on the remaining lifespan of the accessToken
  async function setupAccessRefresh() {
    const accessTokenSuccess = await verifyAccessToken();

    // We first check if the accessToken exists to avoid errors
    if (tokenState.access) {
      // If the access token isn't valid, it gets refreshed
      if (!accessTokenSuccess) {
        await refreshAccessToken();
      } else {
        // If it is valid, we call calculateTokenLifetime() and set a timeOut
        const timeToExpiration = calculateTokenLifetime("accessToken");
        const refreshThreshold = 1 * 60 * 1000; // 1 minute in milliseconds

        // Set up a timer to refresh the token before it expires
        if (timeToExpiration > refreshThreshold) {
          await new Promise((resolve) =>
            setTimeout(resolve, timeToExpiration - refreshThreshold)
          );

          console.log("Refreshing token before expiration...");
          await refreshAccessToken();
        }
      }
    }
  }

  // Same as setupAccessRefresh(), it calculates how much time is left in the refreshToken but deletes it if it's expired
  async function setupRefreshTokenLifetime() {
    const timeToExpiration = calculateTokenLifetime("refreshToken");
    const refreshThreshold = 1 * 60 * 1000; // 1 minute in milliseconds

    // Set up a timer to refresh the token before it expires
    if (timeToExpiration > refreshThreshold) {
      setTimeout(() => {
        logOut("Refresh token expired, login out");
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
