import { Navigate } from "react-router-dom";

export const PrivateRoute: React.FC<{
  isSignedIn: boolean;
  children: React.ReactNode;
}> = (props) => {
  if (!props.isSignedIn) {
    return <Navigate to="/home" replace />; //mi a replace?
  }

  // a childrent lehet fragmentsbe kell rakni
  return props.children;
};
