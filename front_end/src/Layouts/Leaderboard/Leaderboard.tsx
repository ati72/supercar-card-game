import { useEffect, useState } from "react";
import { BASE_URL } from "../../Api/api";
import { Link } from "react-router-dom";

export const Leaderboard = () => {
  // accessToken változó mehetne api csomagba
  const accessToken: string = localStorage.getItem("jwt") || "";
  const [top10Users, setTop10Users] = useState<[]>([]);

  useEffect(() => {
    getTop10();
  }, []);

  const getTop10 = async () => {
    try {
      const response = await fetch(`${BASE_URL}/user/top`, {
        method: "GET",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${accessToken}`,
        },
      });
      if (!response.ok) {
        console.log("Error while fetching top 10");
        throw new Error("Error while fetching top 10");
      }
      const data = await response.json();
      setTop10Users(data);
    } catch (error) {
      console.log("Error during top 10 fetch: " + error);
    }
  };

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
