import React from "react";
import { Link } from "react-router-dom";

export const Users = () => {
  return (
    <div className="admin-container">
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
            <tr className="leaderboard-tr">
              <td className="leaderboard-td">1</td>
              <td className="leaderboard-td">Ati</td>
              <td className="leaderboard-td">
                <button className="login-button">asd</button>
              </td>
            </tr>
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
