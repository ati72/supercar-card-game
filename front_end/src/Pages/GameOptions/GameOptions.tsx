import { useEffect, useState } from "react";
import CardService from "../../Api/CardService";
import { FlexContainerCentered } from "../../Components/Layout/FlexContainerCentered";
import { GameState } from "../../Model/GameState";
import { useNavigate } from "react-router-dom";

export const GameOptions = () => {
  const [deck, setDeck] = useState([]);
  const [playerHand, setPlayerHand] = useState([]);
  const [opponentHand, setOpponentHand] = useState([]);
  //const [gameState, setGameState] = useState(null);
  const [selectMode, setSelectMode] = useState("topSpeed");
  const accessToken: string = localStorage.getItem("jwt") || "";
  const savedGame: GameState = JSON.parse(localStorage.getItem("gameState"));
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
    const playerHand = [];
    for (let i = 0; i < 5; i++) {
      if (deck.length > 0) {
        const randomIndex = Math.floor(Math.random() * deck.length);
        playerHand.push(deck[randomIndex]);
        deck.splice(randomIndex, 1);
      }
    }
    setPlayerHand(playerHand);

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
    console.log(playerHand + "playerHand");
    const newGameState = new GameState(
      selectMode,
      deck,
      playerHand,
      opponentHand,
      null,
      null,
      0,
      false,
      0,
      0
    );
    navigate("/game", { state: newGameState });
  }

  function handleContinueSavedGame() {
    navigate("/game", { state: savedGame });
  }

  function handleBackClicked() {
    navigate("/menu");
  }

  return (
    <FlexContainerCentered>
      <div>
        <h1>Select game mode</h1>
        <div>
          <label>
            Top Speed
            <input
              type="radio"
              value="topSpeed"
              checked={selectMode === "topSpeed"}
              onChange={() => setSelectMode("topSpeed")}
            />
          </label>
        </div>
        <div>
          <label>
            Displacement
            <input
              type="radio"
              value="displacement"
              checked={selectMode === "displacement"}
              onChange={() => setSelectMode("displacement")}
            />
          </label>
        </div>
        <div>
          <label>
            Horsepower
            <input
              type="radio"
              value="horsePower"
              checked={selectMode === "horsePower"}
              onChange={() => setSelectMode("horsePower")}
            />
          </label>
        </div>
      </div>
      <button className="login-button" onClick={handleNewGameClicked}>
        New Game
      </button>
      <button className="login-button" onClick={handleBackClicked}>
        Back
      </button>
      {savedGame ? (
        <div>
          <button className="login-button" onClick={handleContinueSavedGame}>
            Continue
          </button>
        </div>
      ) : (
        ""
      )}
    </FlexContainerCentered>
  );
};
