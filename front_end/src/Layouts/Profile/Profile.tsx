import { Link } from "react-router-dom";

export const Profile: React.FC<{ userInfo: any }> = (props) => {
  //TODO: UserInfo-nak majd egy model, csak először kéne dto backenden...

  return (
    <div className="profile-container">
      <h3>Profile name: {props.userInfo.username}</h3>
      <h3>Games played: {props.userInfo.gamesPlayed}</h3>
      <h3>Games won: {props.userInfo.gamesWon}</h3>
      <h3>Change Password</h3>
      <Link to="../menu">
        <button className="login-button">Back</button>
      </Link>
    </div>
  );
};
