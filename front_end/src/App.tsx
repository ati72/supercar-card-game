import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import { Home } from "./Layouts/Home/Home";
import { Register } from "./Layouts/Login/Register";
import { Login } from "./Layouts/Login/Login";
import { Menu } from "./Layouts/Menu/Menu";
import { Game } from "./Layouts/Game/Game";
import { Inventory } from "./Layouts/Inventory/Inventory";
import { Profile } from "./Layouts/Profile/Profile";
import { Leaderboard } from "./Layouts/Leaderboard/Leaderboard";
import { PrivateRoute } from "./Util/PrivateRoute";
import { Admin } from "./Layouts/Admin/Admin";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const initialUserInfo = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo")!)
    : {};

  const [isSignedIn, setIsSignedIn] = useState(
    localStorage.getItem("jwt") !== "" && localStorage.getItem("jwt") !== null
  );
  const [userInfo, setUserInfo] = useState<object>(initialUserInfo);

  const handleLoginSuccess = (userInfo: object) => {
    setIsSignedIn(true);
    setUserInfo(userInfo);
    localStorage.setItem("userInfo", JSON.stringify(userInfo));
  };

  return (
    <div>
      <ToastContainer
        className="custom-toast-container"
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <Routes>
        <Route path="home" element={<Home />} />
        <Route path="register" element={<Register />} />
        <Route
          path="login"
          element={<Login onLoginSuccess={handleLoginSuccess} />}
        />
        <Route path="*" element={<Navigate to="home" />} />

        <Route
          path="menu"
          element={
            <PrivateRoute isSignedIn={isSignedIn}>
              <Menu />
            </PrivateRoute>
          }
        />
        <Route
          path="play"
          element={
            <PrivateRoute isSignedIn={isSignedIn}>
              <Game />
            </PrivateRoute>
          }
        />
        <Route
          path="inventory"
          element={
            <PrivateRoute isSignedIn={isSignedIn}>
              <Inventory />
            </PrivateRoute>
          }
        />
        <Route
          path="admin"
          element={
            <PrivateRoute isSignedIn={isSignedIn}>
              <Admin />
            </PrivateRoute>
          }
        />

        <Route
          path="profile"
          element={
            <PrivateRoute isSignedIn={isSignedIn}>
              <Profile userInfo={userInfo} />
            </PrivateRoute>
          }
        ></Route>

        <Route
          path="leaderboard"
          element={
            <PrivateRoute isSignedIn={isSignedIn}>
              <Leaderboard />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
