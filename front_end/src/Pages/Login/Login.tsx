import React from "react";
import "../../index.css";
import { LoginAndRegister } from "./components/LoginAndRegister";
import { UserInfo } from "../../Model/UserInfo";

export const Login: React.FC<{
  onLoginSuccess: (userInfo: UserInfo) => void;
}> = (props) => {
  return (
    <LoginAndRegister
      title="Login"
      mode="login"
      onLoginSuccess={props.onLoginSuccess}
    />
  );
};
