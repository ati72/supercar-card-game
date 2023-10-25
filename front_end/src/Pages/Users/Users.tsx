import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import UserService from "../../Api/UserService";
import { FlexContainerCentered } from "../../Components/Layout/FlexContainerCentered";
import { UserInfo } from "../../Model/UserInfo";

export const Users = () => {
  // ide lehetne valami dto be-n és modellben megcsinálni itt aztn a típust hozzááadni a usestatehez...
  const [userList, setUserList] = useState<UserInfo[]>([]);
  const accessToken: string = localStorage.getItem("jwt") || "";

  useEffect(() => {
    async function fetchUsers() {
      try {
        const users = await UserService.getAllUsers(accessToken);
        setUserList(users);
        console.log(users);
      } catch (error) {
        console.error("Error fetching users. Users.tsx");
        throw new Error(`Request failed userService.getUser() at users.tsx`);
      }
    }
    fetchUsers();
  }, []);

  // TODO: Kéne valami csekk, hogy saját magad ne tudd törölni...

  const handleDeleteUser = async (userId: number) => {
    try {
      await UserService.deleteUser(userId, accessToken);
      setUserList((prevUserList) =>
        prevUserList.filter((user) => user.id !== userId)
      );
    } catch (error) {
      console.error("Error deleting user.", error);
    }
  };

  return (
    <div className="admin-container">
      <h1>Manage Users</h1>
      <FlexContainerCentered>
        <div className="user-table-container">
          <table className="users-table">
            <thead className="leaderboard-th">
              <tr className="leaderboard-tr">
                <th>ID</th>
                <th>Username</th>
                <th>Authorities</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody className="leaderboard-tbody">
              {userList.map((user) => (
                <tr className="leaderboard-tr" key={user.id}>
                  <td className="leaderboard-td">{user.id}</td>
                  <td className="leaderboard-td">{user.username}</td>
                  <td className="leaderboard-td">
                    {user.authorities.map((auth) => ` ${auth.authority} `)}
                  </td>
                  <td className="leaderboard-td">
                    <Link to={`/user/${user.id}`}>
                      <button className="login-button">Details</button>
                    </Link>
                    <button
                      className="login-button"
                      onClick={() => handleDeleteUser(user.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div>
          <Link to="/admin">
            <button className="login-button">Back</button>
          </Link>
        </div>
      </FlexContainerCentered>
    </div>
  );
};
