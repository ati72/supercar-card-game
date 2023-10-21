import React from "react";
import { Link } from "react-router-dom";
import { AdminInfoCard } from "../../Components/Cards/AdminInfoCard";

export const Admin = () => {
  return (
    <div className="admin-container">
      Admin stuff
      <AdminInfoCard infoData={123} infoTitle="TITLE" />
      <div>
        <Link to="/users">
          <button className="login-button">Manage Users</button>
        </Link>
      </div>
      <div>
        <Link to="/inventory">
          <button className="login-button">Manage Cards</button>
        </Link>
      </div>
      <div>
        <Link to="/menu">
          <button className="login-button">Back</button>
        </Link>
      </div>
    </div>
  );
};
