import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../../Api/api";
import { toast } from "react-toastify";

export const LoginAndRegister: React.FC<{
  title: string;
  mode: string;
  onLoginSuccess: (o: object) => void;
}> = (props) => {
  const password = useRef("");
  const userName = useRef("");
  const navigate = useNavigate();

  const handleButtonClicked = async () => {
    if (props.mode === "register") {
      handleRegister();
    } else {
      handleLogin();
    }
  };

  const handleLogin = async () => {
    if (password.current === "" || password.current.length < 3) {
      toast.warn("Password must be at least 3 characters long");
      return;
    }
    if (userName.current === "" || userName.current.length < 3) {
      toast.warn("Username must be at least 3 characters long");
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          username: userName.current,
          password: password.current,
        }),
      });
      if (!response.ok) {
        toast.error("Incorrect username or password");
        throw new Error("Something went Wrong");
      }
      const jwt = response.headers.get("authorization") || ""; // ts nem engedi a null-t...
      const body = await response.json();
      console.log(body);
      localStorage.setItem("jwt", jwt);
      props.onLoginSuccess(body);
      console.log(response.headers.get("authorization"));

      navigate("/menu");
    } catch (error) {
      console.log("Error during login fetch " + error);
    }

    console.log(password.current + " " + userName.current);
  };

  const handleRegister = async () => {
    if (password.current === "" || password.current.length < 3) {
      toast.warn("Password must be at least 3 characters long");
      return;
    }
    if (userName.current === "" || userName.current.length < 3) {
      toast.warn("Username must be at least 3 characters long");
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/user/register`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          username: userName.current,
          password: password.current,
        }),
      });

      if (response.ok) {
        toast.success("Account created. Log in!.");
        navigate("/login");
      } else if (response.status === 400) {
        const responseBody = await response.json();
        if (responseBody.code === "123") {
          toast.error(responseBody.message);
        } else {
          toast.error("Something went wrong.");
        }
      }
    } catch (error) {
      toast.error("Error during login fetch.");
      console.log("Error during fetch." + error);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>{props.title}</h1>
        <input
          id="username"
          className="login-input"
          type="text"
          placeholder="Username"
          onChange={(e) => (userName.current = e.target.value)}
        />
        <input
          id="password"
          className="login-input"
          type="password"
          placeholder="Password"
          onChange={(e) => (password.current = e.target.value)}
        />
        <button
          className="login-button"
          onClick={handleButtonClicked}
          type="submit"
        >
          Send
        </button>
      </div>
    </div>
  );
};
