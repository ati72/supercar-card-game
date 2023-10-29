import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import UserService from "../../Api/UserService";
import { UserInfo } from "../../Model/UserInfo";

export const Leaderboard = () => {
  const accessToken: string = localStorage.getItem("jwt") || "";
  const [top10Users, setTop10Users] = useState<UserInfo[]>([]);

  useEffect(() => {
    async function fetchTop10() {
      try {
        const response = await UserService.getTop10(accessToken);
        setTop10Users(response);
      } catch (error) {
        console.error("Error fetching top 10");
      }
    }
    fetchTop10();
  }, []);

  return (
    <div className="leaderboard-container">
      <h1>Leaderboard</h1>
      <table className="leaderboard-table">
        <thead className="leaderboard-th">
          <tr className="leaderboard-tr">
            <th>Name</th>
            <th>Games won</th>
          </tr>
        </thead>
        <tbody className="leaderboard-tbody">
          {top10Users.map((user) => (
            <tr className="leaderboard-tr" key={user.id}>
              <td className="leaderboard-td">{user.username}</td>
              <td className="leaderboard-td">{user.gamesWon}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link to="../menu">
        <button className="login-button">Back</button>
      </Link>
    </div>
  );
};
