import { BASE_URL } from "./api";

class UserService {
  // Acces token contextbe kéne...
  async getUser(userId: number, accessToken: string) {
    try {
      const response = await fetch(`${BASE_URL}/user/${userId}`, {
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${accessToken}`,
        },
        method: "GET",
      });
      if (!response.ok) {
        throw new Error(`Request failed with status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      throw new Error(`Request failed userService.getUser()`);
    }
  }

  async getAllUsers(accessToken: string) {
    try {
      const response = await fetch(`${BASE_URL}/user/all`, {
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${accessToken}`,
        },
        method: "GET",
      });
      if (!response.ok) {
        throw new Error(`Request failed with status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      throw new Error(`Request failed userService.getAllUsers()`);
    }
  }

  async deleteUser(userId: number, accessToken: string) {
    try {
      const response = await fetch(`${BASE_URL}/user/delete/${userId}`, {
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${accessToken}`,
        },
        method: "DELETE",
      });
      if (!response.ok) {
        console.log("Error while deleting user");
        throw new Error(`Request failed with status: ${response.status}`);
      }
    } catch (error) {
      console.log("Error while deleting user");
      throw new Error(`Request failed userService.delete()`);
    }
  }

  async promoteUser(userId: number, accessToken: string) {
    try {
      const response = await fetch(`${BASE_URL}/user/promote/${userId}`, {
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${accessToken}`,
        },
        method: "PUT",
      });
      if (!response.ok) {
        console.log("Error while promoting user");
        throw new Error(`Request failed with status: ${response.status}`);
      }
    } catch (error) {
      console.log("Error while promoting user");
      throw new Error(`Request failed userService.promoteUser()`);
    }
  }

  async demoteUser(userId: number, accessToken: string) {
    try {
      const response = await fetch(`${BASE_URL}/user/demote/${userId}`, {
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${accessToken}`,
        },
        method: "PUT",
      });
      if (!response.ok) {
        console.log("Error while demoting user");
        throw new Error(`Request failed with status: ${response.status}`);
      }
    } catch (error) {
      console.log("Error while demoting user");
      throw new Error(`Request failed userService.demoteUser()`);
    }
  }

  async getTop10(accessToken: string) {
    try {
      const response = await fetch(`${BASE_URL}/user/top`, {
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${accessToken}`,
        },
        method: "GET",
      });
      if (!response.ok) {
        console.log("Error while fetching top 10");
        throw new Error(`Request failed with status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.log("Error while getting top 10");
      throw new Error(`Request failed userService.getTop10()`);
    }
  }
}

export default new UserService();
