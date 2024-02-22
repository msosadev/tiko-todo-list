import "./App.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Todo from "./components/Todo/Todo";
import Welcome from "./components/Welcome/Welcome";
import Home from "./components/Home/Home";

function App() {
  const accessToken = localStorage.getItem("access_token");

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
              element={accessToken ? <Todo /> : <Navigate to="/register" />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
