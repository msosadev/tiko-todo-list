export const refreshAccessToken = async () => {
  const api = "https://todos-api.public.tiko.energy/api/token/refresh/";
  const refreshToken = localStorage.getItem("refresh_token");
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
        applyTokens(result.access);
      })
      .catch((error) => {
        console.error("Error during refresh:", error);
      });
  }
};

export const applyTokens = (accessToken, refreshToken) => {
  accessToken && localStorage.setItem("access_token", accessToken);
  refreshToken && localStorage.setItem("refresh_token", refreshToken);
};

export const verifyAccessToken = async () => {
  const api = "https://todos-api.public.tiko.energy/api/token/verify/";
  const accessToken = localStorage.getItem("access_token");
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
        //   console.log("Token verified");
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

export const verifyRefreshToken = async () => {
  const api = "https://todos-api.public.tiko.energy/api/token/verify/";
  const refreshToken = localStorage.getItem("refresh_token");
  const data = { token: refreshToken };

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
        //   console.log("Token verified");
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

// Removes tokens from local storage
export function logOut() {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
}

// Set a value in local storage with a timestamp
export function setValueWithTimestamp(key, value) {
  // Store the current timestamp
  const timestamp = new Date().toISOString();
  localStorage.setItem(key, JSON.stringify({ value, timestamp }));
}

// Get the value and timestamp from local storage
export function getValueWithTimestamp(key) {
  const storedValue = localStorage.getItem(key);
  if (storedValue) {
      const { value, timestamp } = JSON.parse(storedValue);
      return { value, timestamp };
  }
  return "null";
}
