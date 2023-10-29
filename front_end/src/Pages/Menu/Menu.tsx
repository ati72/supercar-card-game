import { Link, useNavigate } from "react-router-dom";
import { UserInfo } from "../../Model/UserInfo";

export const Menu = () => {
  const navigate = useNavigate();

  const signOut = () => {
    localStorage.removeItem("jwt");
    localStorage.removeItem("userInfo");
    navigate("/home");
  };

  // ebből lehetne olyan isAdmin mint az inventoryban...
  const userInfo: UserInfo = JSON.parse(
    localStorage.getItem("userInfo") || "{}"
  );

  return (
    <div className="menu-container">
      <Link to="../play">
        <button className="menu-button">Play</button>
      </Link>
      <Link to="../inventory">
        <button className="menu-button">Inventory</button>
      </Link>
      <Link to="../profile">
        <button className="menu-button">Profile</button>
      </Link>
      <Link to="../leaderboard">
        <button className="menu-button">Leaderboard</button>
      </Link>
      {userInfo.authorities?.some((auth) => auth.authority == "ADMIN") && (
        <Link to="../admin">
          <button className="menu-button">Admin</button>
        </Link>
      )}

      <button className="menu-button" onClick={() => signOut()}>
        Logout
      </button>
    </div>
  );
};
