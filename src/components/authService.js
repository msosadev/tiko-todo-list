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
  return "null"; // It doesn't work if null is returned, it's necessarry to return a string 
}

// Makes an api request to verify the accessToken, returns true or false
export const verifyAccessToken = async () => {
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
