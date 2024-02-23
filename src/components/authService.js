const refreshAccessToken = async () => {
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

const applyTokens = (accessToken, refreshToken) => {
  accessToken && localStorage.setItem("access_token", accessToken);
  refreshToken && localStorage.setItem("refresh_token", refreshToken);
};

const verifyAccessToken = async () => {
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

const verifyRefreshToken = async () => {
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

function logOut() {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
}

export { verifyAccessToken, verifyRefreshToken, refreshAccessToken, logOut };
