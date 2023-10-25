import { Navigate } from "react-router-dom";
import { UserInfo } from "../Model/UserInfo";

export const PrivateRoute: React.FC<{
  isSignedIn: boolean;
  isAdmin?: boolean;
  children: React.ReactNode;
}> = (props) => {
  const userInfo: UserInfo = JSON.parse(
    localStorage.getItem("userInfo") || "{}"
  );

  if (!props.isSignedIn) {
    return <Navigate to="/home" replace />;
  }
  if (props.isAdmin) {
    if (!userInfo.authorities?.some((auth) => auth.authority == "ADMIN")) {
      return <Navigate to="/error" replace />;
    }
  }

  return props.children;
};
