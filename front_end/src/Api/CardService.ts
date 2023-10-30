import { CardModel } from "../Model/Card";
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

  async saveCard(cardData: any, accessToken: string) {
    try {
      const response = await fetch(`${BASE_URL}/cards/save`, {
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(cardData),
        method: "POST",
      });
      if (!response.ok) {
        console.log("Error while saving cards");
        throw new Error(`Request failed with status: ${response.status}`);
      }
      return await response.text();
    } catch (error) {
      console.log("Error while saving card");
      throw new Error("Request failed cardservice.saveCard()");
    }
  }

  async updateCard(id: number, cardData, accessToken: string) {
    try {
      const response = await fetch(`${BASE_URL}/cards/${id}`, {
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(cardData),
        method: "PUT",
      });
      if (!response.ok) {
        console.log("Error while updating card");
        throw new Error(`Request failed with status: ${response.status}`);
      }
      return await response.text();
    } catch (error) {
      console.log("Error while updating card");
      throw new Error("Request failed cardservice.updateCard()");
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
      console.log("Error while deleting card");
      throw new Error("Request failed cardservice.deleteCard()");
    }
  }
}
export default new CardService();
