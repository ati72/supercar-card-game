import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { NewPasswordModal } from "./components/NewPasswordModal";
import { UserInfo } from "../../Model/UserInfo";
import UserService from "../../Api/UserService";

export const Profile: React.FC<{ userInfo: number }> = (props) => {
  //TODO: átnevezni a userinfo-t...
  const [isNewPasswordModalActive, setIsNewPasswordModalActive] =
    useState<boolean>(false);
  const [user, setUser] = useState<UserInfo>({});
  const accessToken = localStorage.getItem("jwt") || "";

  const handleCloseModal = () => {
    document.body.classList.remove("modal-open");
    setIsNewPasswordModalActive(false);
  };

  useEffect(() => {
    async function fetchUser(userId: number) {
      try {
        const response = await UserService.getUser(userId, accessToken);
        setUser(response);
      } catch (error) {
        console.log("Error fetching user");
      }
    }
    fetchUser(props.userInfo);
  }, []);

  return (
    <div className="profile-container">
      <h3>Profile name: {user.username}</h3>
      <h3>Games played: {user.gamesPlayed}</h3>
      <h3>Games won: {user.gamesWon}</h3>
      <h3>
        Win percentage:{" "}
        {user.gamesWon !== 0
          ? ((user.gamesWon / user.gamesPlayed) * 100).toFixed(2)
          : 0}
        %
      </h3>
      <button
        className="login-button"
        onClick={() => setIsNewPasswordModalActive(true)}
      >
        Change Password
      </button>
      <Link to="../menu">
        <button className="login-button">Back</button>
      </Link>
      {isNewPasswordModalActive && (
        <NewPasswordModal
          isNewPasswordModalActive={isNewPasswordModalActive}
          handleCloseModal={handleCloseModal}
          username={user.username}
        />
      )}
    </div>
  );
};
