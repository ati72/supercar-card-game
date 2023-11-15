import React from "react";

export const AdminInfoCard: React.FC<{
  infoData: number;
  infoTitle: string;
}> = (props) => {
  return (
    <div className="admin-info-card">
      <div style={{ fontSize: "42px" }}>{props.infoData}</div>
      <div style={{ textAlign: "center" }}>{props.infoTitle}</div>
    </div>
  );
};
