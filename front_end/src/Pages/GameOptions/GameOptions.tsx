import { useEffect, useState } from "react";
import CardService from "../../Api/CardService";
import { FlexContainerCentered } from "../../Components/Layout/FlexContainerCentered";
import { GameState } from "../../Model/GameState";
import { useNavigate } from "react-router-dom";

export const GameOptions = () => {
  const [deck, setDeck] = useState([]);
  const [playerHand, setPlayerHand] = useState([]);
  const [opponentHand, setOpponentHand] = useState([]);
  const [gameState, setGameState] = useState(null);
  const accessToken: string = localStorage.getItem("jwt") || "";
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchDeck() {
      try {
        const response = await CardService.getCards(accessToken);
        console.log(response);
        setDeck(response);
      } catch (error) {
        console.log("Error fetching deck");
      }
    }
    fetchDeck();
  }, []);

  function handleNewGameClicked() {
    // Draw 5 cards for the player
    const playerHand = [];
    for (let i = 0; i < 5; i++) {
      if (deck.length > 0) {
        const randomIndex = Math.floor(Math.random() * deck.length);
        playerHand.push(deck[randomIndex]);
        deck.splice(randomIndex, 1);
      }
    }
    setPlayerHand(playerHand);

    // Draw 5 cards for the opponent
    const opponentHand = [];
    for (let i = 0; i < 5; i++) {
      if (deck.length > 0) {
        const randomIndex = Math.floor(Math.random() * deck.length);
        opponentHand.push(deck[randomIndex]);
        deck.splice(randomIndex, 1);
      }
    }
    setOpponentHand(opponentHand);
    console.log(deck);
    console.log(playerHand + "ADASDASDSAD");
    const newGameState = new GameState(
      "topSpeed",
      deck,
      playerHand,
      opponentHand,
      0,
      false,
      0,
      0
    );
    navigate("/game", { state: newGameState });
  }

  function handleBackClicked() {
    navigate("/menu");
  }

  return (
    <FlexContainerCentered>
      <button className="login-button" onClick={handleNewGameClicked}>
        New Game
      </button>
      <button className="login-button" onClick={handleBackClicked}>
        Back
      </button>
    </FlexContainerCentered>
  );
};