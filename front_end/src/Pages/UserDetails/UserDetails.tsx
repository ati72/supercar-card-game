import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import UserService from "../../Api/UserService";
import { FlexContainerCentered } from "../../Components/Layout/FlexContainerCentered";
import { UserInfo } from "../../Model/UserInfo";
import { toast } from "react-toastify";

export const UserDetails = () => {
  const { userId } = useParams();
  const accessToken = localStorage.getItem("jwt") || "";
  const [userInfo, setUserInfo] = useState<UserInfo | null>({}); // ezzel még valamit kezdeni kéne a string miatt... initial userinfo?
  const [isAdmin, setIsAdmin] = useState(false);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    async function fetchUser(userId: number) {
      try {
        if (isNaN(userId)) {
          setUserInfo(null);
          return;
        }
        const userInfoResponse = await UserService.getUser(userId, accessToken);
        setUserInfo(userInfoResponse); // backendről null jön, ha nincs olyan user
        const isAdmin: boolean = userInfoResponse.authorities.some(
          (auth) => auth.authority === "ADMIN"
        );
        setIsAdmin(isAdmin);
      } catch (error) {
        console.error("Error fetching users");
      }
    }
    fetchUser(userId);
  }, [refresh]);

  async function handlePromoteUser(userId: number) {
    try {
      await UserService.promoteUser(userId, accessToken);
      refresh ? setRefresh(false) : setRefresh(true);
      toast.success("User promoted successfully!");
    } catch (error) {
      toast.error("Error while promoting user!");
      console.log("Error while promoting user");
    }
  }

  async function handleDemoteUser(userId: number) {
    try {
      await UserService.demoteUser(userId, accessToken);
      refresh ? setRefresh(false) : setRefresh(true);
      toast.success("User demoted successfully!");
    } catch (error) {
      toast.error("Error while demoting user!");
      console.log("Error while demoting user");
    }
  }

  return (
    <div>
      {userInfo === null ? (
        <FlexContainerCentered>
          <h1>User not found</h1>
          <Link to="/users">
            <button className="login-button">Back</button>
          </Link>
        </FlexContainerCentered>
      ) : (
        <FlexContainerCentered>
          User ID: {userInfo.id}
          <div>User Name: {userInfo.username}</div>
          <div>
            User Authorities:
            {userInfo.authorities?.map((auth) => (
              <p key={auth.id}>{auth.authority}</p>
            ))}
          </div>
          <div>Matches played: {userInfo.gamesPlayed}</div>
          <div>Matches won: {userInfo.gamesWon}</div>
          <div>
            <div>
              {isAdmin ? (
                <button
                  className="login-button"
                  onClick={() => handleDemoteUser(userInfo.id)}
                >
                  Revoke Admin Authority
                </button>
              ) : (
                <button
                  className="login-button"
                  onClick={() => handlePromoteUser(userInfo.id)}
                >
                  Grant Admin Authority
                </button>
              )}
            </div>
            <div>
              <Link to="/users">
                <button className="login-button">Back</button>
              </Link>
            </div>
          </div>
        </FlexContainerCentered>
      )}
    </div>
  );
};
