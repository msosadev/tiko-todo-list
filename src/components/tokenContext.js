import { createContext } from "react";

export const TokenContext = createContext({
  tokenState: { access: null, refresh: null },
  setAccessToken: () => {},
  setRefreshToken: () => {},
});
