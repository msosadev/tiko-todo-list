import { createContext } from "react";

// A context that contains both tokens and a function to update each one
export const TokenContext = createContext({
  tokenState: { access: null, refresh: null },
  setAccessToken: () => {},
  setRefreshToken: () => {},
});
