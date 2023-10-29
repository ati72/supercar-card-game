import { BASE_URL } from "./api";

class CardService {
  async getCards(accessToken: string) {
    try {
      const response = await fetch(`${BASE_URL}/cards`, {
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${accessToken}`,
        },
        method: "GET",
      });
      if (!response.ok) {
        console.log("Error while fetching cards");
        throw new Error(`Request failed with status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      throw new Error("Request failed cardService.getCards()");
    }
  }

  async deleteCard(id: number, accessToken: string) {
    try {
      const response = await fetch(`${BASE_URL}/cards/delete/${id}`, {
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${accessToken}`,
        },
        method: "DELETE",
      });
      if (!response.ok) {
        console.log("Error while deleting card");
        throw new Error(`Request failed with status: ${response.status}`);
      }
    } catch (error) {
      console.log("Error while deleting user");
      throw new Error("Request failed cardservice.deleteCard()");
    }
  }
}
export default new CardService();
