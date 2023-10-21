import React from "react";
import "../../index.css";
import { LoginAndRegister } from "./components/LoginAndRegister";

export const Login: React.FC<{
  onLoginSuccess: (o: object) => void;
}> = (props) => {
  return (
    <LoginAndRegister
      title="Login"
      mode="login"
      onLoginSuccess={props.onLoginSuccess}
    />
  );
};
