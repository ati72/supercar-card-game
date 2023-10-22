import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import UserService from "../../Api/UserService";

export const UserDetails = () => {
  const { userId } = useParams();
  const accessToken = localStorage.getItem("jwt") || "";
  const [userInfo, setUserInfo] = useState("");

  useEffect(() => {
    async function fetchUser(userId: number) {
      try {
        if (isNaN(userId)) {
          setUserInfo(null);
          return;
        }
        const userInfoResponse = await UserService.getUser(userId, accessToken);
        setUserInfo(userInfoResponse);
      } catch (error) {
        console.error("Error fetching users");
      }
    }
    fetchUser(userId);
  }, []);

  return (
    <div>
      {userInfo === null ? (
        <div className="error-page">
          <h1>User not found</h1>
          <Link to="/users">
            <button className="login-button">Back</button>
          </Link>
        </div>
      ) : (
        <div>
          User ID: {userInfo.id}
          <div>User Name: {userInfo.username}</div>
        </div>
      )}
    </div>
  );
};
