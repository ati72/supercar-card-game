import { Navigate } from "react-router-dom";

export const PrivateRoute: React.FC<{
  isSignedIn: boolean;
  children: React.ReactNode;
}> = (props) => {
  if (!props.isSignedIn) {
    return <Navigate to="/home" replace />;
  }

  return props.children;
};
