const domain = "https://todos-api.public.tiko.energy";

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
  return "null"; // It fails if null is returned, it's required to return a string
}

// Makes an api request to verify the accessToken, returns true or false
export const verifyAccessToken = async () => {
  const api = `${domain}/api/token/verify/`;
  const accessTokenValue = getValueWithTimestamp("accessToken").value;
  const accessToken = localStorage.getItem("accessToken");
  const data = { token: accessTokenValue };

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

export const postApi = (data, endpoint) => {
  const api = `${domain}/api/${endpoint}/`;
  return fetch(api, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (!response.ok) {
        // Handle non-successful response here
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
};
