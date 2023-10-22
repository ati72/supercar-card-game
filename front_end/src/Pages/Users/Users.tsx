import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import UserService from "../../Api/UserService";

export const Users = () => {
  const [userList, setUserList] = useState([]);
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

  return (
    <div className="admin-container">
      <h1>Manage Users</h1>
      <div>
        <table className="leaderboard-table">
          <thead className="leaderboard-th">
            <tr className="leaderboard-tr">
              <th>ID</th>
              <th>Username</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className="leaderboard-tbody">
            {userList.map((user) => (
              <tr className="leaderboard-tr" key={user.id}>
                <td className="leaderboard-td">{user.id}</td>
                <td className="leaderboard-td">{user.username}</td>
                <td className="leaderboard-td">
                  <Link to={`/user/${user.id}`}>
                    <button className="login-button">Details</button>
                  </Link>
                  <button
                    className="login-button"
                    onClick={() => UserService.deleteUser(user.id, accessToken)}
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
        <Link to="/menu">
          <button className="login-button">Back</button>
        </Link>
      </div>
    </div>
  );
};
