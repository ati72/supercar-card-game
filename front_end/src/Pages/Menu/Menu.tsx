import { Link, useNavigate } from "react-router-dom";
import { UserInfo } from "../../Model/UserInfo";

export const Menu = () => {
  const navigate = useNavigate();

  const signOut = () => {
    localStorage.removeItem("jwt");
    localStorage.removeItem("userInfo");
    localStorage.removeItem("gameState");
    navigate("/home");
  };

  const userInfo: UserInfo = JSON.parse(
    localStorage.getItem("userInfo") || "{}"
  );
  const isAdmin: boolean = userInfo.authorities?.some(
    (auth) => auth.authority === "ADMIN"
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
      {isAdmin && (
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
