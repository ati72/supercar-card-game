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
        // itt inkább átirnyítani not found oldalra??
        throw new Error(`Request failed with status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      throw new Error(`Request failed userService.getUser()`);
    }
  }
}

export default new UserService();
