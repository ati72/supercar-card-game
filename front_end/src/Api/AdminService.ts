import { BASE_URL } from "./api";

class AdminService {
  async getStats(accessToken: string) {
    try {
      const response = await fetch(`${BASE_URL}/cards/getStats`, {
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${accessToken}`,
        },
        method: "GET",
      });
      if (!response.ok) {
        console.log("Error fetching stats");
      }
      return await response.json();
    } catch (error) {
      throw new Error("Request failed adminService.getStats()");
    }
  }
}

export default new AdminService();
