import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import UserService from "../../Api/UserService";

export const UserDetails = () => {
  const { userId } = useParams();
  const accessToken = localStorage.getItem("jwt") || "";
  const [userInfo, setUserInfo] = useState("");
  useEffect(() => {
    async function fetchUser(userId: number) {
      try {
        const userInfoResponse = await UserService.getUser(userId, accessToken);
        setUserInfo(userInfoResponse);
      } catch (error) {
        console.error("Error fetching users");
      }
    }
    fetchUser(userId);
  }, []);

  return (
    <div>
      User ID: {userInfo.id}
      <div>User Name: {userInfo.username}</div>
    </div>
  );
};
