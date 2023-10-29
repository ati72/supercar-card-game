import { FlexContainerCentered } from "../../Components/Layout/FlexContainerCentered";
import { Link } from "react-router-dom";

export const ErrorPage = () => {
  return (
    <FlexContainerCentered>
      <div>403</div>
      <div>Unauthorized</div>
      <Link to="/menu">
        <button className="login-button">Back</button>
      </Link>
    </FlexContainerCentered>
  );
};
