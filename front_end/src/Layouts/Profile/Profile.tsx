import { useState } from "react";
import { Link } from "react-router-dom";
import { NewPasswordModal } from "./components/NewPasswordModal";

export const Profile: React.FC<{ userInfo: any }> = (props) => {
  //TODO: local helyett api request!!!!! akkor userInfo prop mehet a kukába
  const [isNewPasswordModalActive, setIsNewPasswordModalActive] =
    useState<boolean>(false);

  const userInfo2 = JSON.parse(localStorage.getItem("userInfo") || "");

  const handleCloseModal = () => {
    document.body.classList.remove("modal-open");
    setIsNewPasswordModalActive(false);
  };

  return (
    <div className="profile-container">
      <h3>Profile name: {userInfo2.username}</h3>
      <h3>Games played: {userInfo2.gamesPlayed}</h3>
      <h3>Games won: {userInfo2.gamesWon}</h3>
      <h3>Change Password</h3>
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
          username={userInfo2.username}
        />
      )}
    </div>
  );
};
