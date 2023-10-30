import { Navigate } from "react-router-dom";
import { UserInfo } from "../Model/UserInfo";

export const PrivateRoute: React.FC<{
  isSignedIn: boolean;
  isAdminRoute?: boolean;
  children: React.ReactNode;
}> = (props) => {
  const userInfo: UserInfo = JSON.parse(
    localStorage.getItem("userInfo") || "{}"
  );
  const isAdmin: boolean = userInfo.authorities?.some(
    (auth) => auth.authority === "ADMIN"
  );

  if (!props.isSignedIn) {
    return <Navigate to="/home" replace />;
  }

  if (props.isAdminRoute) {
    if (!isAdmin) {
      return <Navigate to="/error" replace />;
    }
  }

  return props.children;
};
