import "./App.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Todo from "./components/Todo/Todo";
import Welcome from "./components/Welcome/Welcome";
import Home from "./components/Home/Home";
// import { verifyAccessToken } from "./components/authService";
import { useContext } from "react";
import { LocalAccessToken } from "./components/tokenContext";

function App() {
  const localAccessToken = useContext(LocalAccessToken);
  // let accessToken;
  // async function checkAccessToken() {
  //   const accessTokenSuccess = await verifyAccessToken();
  //   accessToken = accessTokenSuccess;
  //   console.log(accessToken, accessTokenSuccess);
  // }

  // useEffect(() => {
  //   checkAccessToken();
  // }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route path="/" element={<Welcome />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/todo"
              element={localAccessToken ? <Todo /> : <Navigate to="/register" />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
