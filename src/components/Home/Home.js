import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
// import { useNavigate } from "react-router-dom";
// import {
//   logOut,
//   refreshAccessToken,
//   verifyAccessToken,
//   verifyRefreshToken,
// } from "../authService";
// import { useEffect } from "react";

export default function Home() {
  // const navigate = useNavigate();
  
  // useEffect(() => {
  //   const checkTokens = async () => {
  //     const refreshTokenSuccess = await verifyRefreshToken();
  //     const accessTokenSuccess = await verifyAccessToken();

  //     if (!refreshTokenSuccess) {
  //       logOut();
  //       navigate("/");
  //     }

  //     if (!accessTokenSuccess) {
  //       refreshAccessToken();
  //     }
  //   };

  //   checkTokens(); // Call the clickHandler logic immediately
  // }, []);

  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}
