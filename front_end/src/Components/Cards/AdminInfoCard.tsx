import React from "react";

export const AdminInfoCard: React.FC<{
  infoData: number;
  infoTitle: string;
}> = (props) => {
  return (
    <div className="admin-info-card">
      <div>{props.infoData}</div>
      <div>{props.infoTitle}</div>
    </div>
  );
};
