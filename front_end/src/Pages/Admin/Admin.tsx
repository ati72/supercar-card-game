import { Link } from "react-router-dom";
import { AdminInfoCard } from "../../Components/Cards/AdminInfoCard";
import { useEffect, useState } from "react";
import AdminService from "../../Api/AdminService";
import StatsResponse from "../../Model/StatsResponse";

export const Admin = () => {
  // ezt nem ellenőriztem lehet még bekavar?? type
  const [stats, setStats] = useState<StatsResponse>({});
  const accessToken: string = localStorage.getItem("jwt") || "";

  useEffect(() => {
    async function fetchStats() {
      try {
        const response = await AdminService.getStats(accessToken);
        console.log(response);
        setStats(response);
      } catch (error) {
        console.log("Error fetching stats.");
      }
    }
    fetchStats();
  }, []);

  return (
    <div className="admin-container">
      <h1>Admin</h1>
      <AdminInfoCard infoData={stats.numOfUsers} infoTitle="Number of users" />
      <AdminInfoCard infoData={stats.numOfMods} infoTitle="Number of mods" />
      <AdminInfoCard infoData={stats.numOfCards} infoTitle="Number of cards" />
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
