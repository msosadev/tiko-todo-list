// export const refreshAccessToken = async () => {
//   const api = "https://todos-api.public.tiko.energy/api/token/refresh/";
//   const refreshToken = localStorage.getItem("refreshToken");
//   const data = {
//     refresh: refreshToken,
//   };

//   if (refreshToken !== null) {
//     fetch(api, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(data),
//     })
//       .then((response) => response.json())
//       .then((result) => {
//         applyTokens(result.access);
//       })
//       .catch((error) => {
//         console.error("Error during refresh:", error);
//       });
//   }
// };

export const applyTokens = (accessToken, refreshToken) => {
  accessToken && localStorage.setItem("access_token", accessToken);
  refreshToken && localStorage.setItem("refresh_token", refreshToken);
};

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
