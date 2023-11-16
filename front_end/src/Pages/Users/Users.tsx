import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import UserService from "../../Api/UserService";
import { FlexContainerCentered } from "../../Components/Layout/FlexContainerCentered";
import { UserInfo } from "../../Model/UserInfo";

export const Users = () => {
  const [userList, setUserList] = useState<UserInfo[]>([]);
  const [searchString, setSearchString] = useState<string>("");
  const [searchOption, setSearchOption] = useState("username");
  const accessToken: string = localStorage.getItem("jwt") || "";
  const userInfo: UserInfo = JSON.parse(localStorage.getItem("userInfo"));

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

  const filteredUserList = userList.filter((user) => {
    if (searchOption === "id") {
      return user.id.toString().includes(searchString);
    } else if (searchOption === "username") {
      return user.username.toLowerCase().includes(searchString.toLowerCase());
    }
  });

  return (
    <div className="admin-container">
      <h1>Manage Users</h1>
      <FlexContainerCentered>
        <div className="admin-search">
          <input
            className="login-input"
            type="text"
            placeholder="Search"
            value={searchString}
            onChange={(e) => setSearchString(e.target.value)}
          />
          <div>
            <div>
              <label>
                Search by ID
                <input
                  type="radio"
                  value="id"
                  checked={searchOption === "id"}
                  onChange={() => setSearchOption("id")}
                />
              </label>
            </div>
            <div>
              <label>
                Search by Username
                <input
                  type="radio"
                  value="username"
                  checked={searchOption === "username"}
                  onChange={() => setSearchOption("username")}
                />
              </label>
            </div>
          </div>
        </div>
        {filteredUserList.length > 0 ? (
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
                {filteredUserList.map((user) => (
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
                      {userInfo.id !== user.id && (
                        <button
                          className="login-button"
                          onClick={() => handleDeleteUser(user.id)}
                          disabled={userInfo.id === user.id}
                        >
                          Delete
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <h1>No user found</h1>
        )}

        <div>
          <Link to="/admin">
            <button className="login-button">Back</button>
          </Link>
        </div>
      </FlexContainerCentered>
    </div>
  );
};
