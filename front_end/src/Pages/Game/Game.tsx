import { useEffect, useState } from "react";
import { CardModel } from "../../Model/Card";
import { GameState } from "../../Model/GameState";
import { useLocation } from "react-router-dom";
import { GameCard } from "../../Components/Cards/GameCard";
import { FlexContainerCentered } from "../../Components/Layout/FlexContainerCentered";
import { UserInfo } from "../../Model/UserInfo";
import UserService from "../../Api/UserService";
import { GameOverModal } from "./components/GameOverModal";
import { OpponentCard } from "../../Components/Cards/OpponentCard";

export const Game = () => {
  const location = useLocation();
  const [gameState, setGameState] = useState<GameState>(location.state);
  const [playerPoints, setPlayerPoints] = useState(gameState.playerPoints);
  const [opponentPoints, setOpponentPoints] = useState(
    gameState.opponentPoints
  );
  const [playerCard, setPlayerCard] = useState(gameState.playerCard);
  const [opponentCard, setOpponentCard] = useState(gameState.opponentCard);
  const [statusMessage, setStatusMessage] = useState("Play a card");
  const [matchWinner, setMatchWinner] = useState("");
  const [isGameOverModalActive, setIsGameOverModalActive] =
    useState<boolean>(false);

  const userId: UserInfo = JSON.parse(localStorage.getItem("userInfo"));
  const accessToken: string = localStorage.getItem("jwt");

  useEffect(() => {
    async function updateStatsWin() {
      try {
        const response = await UserService.winner(accessToken, userId.id);
        console.log(response);
      } catch (error) {
        console.log("Error updating stats.");
      }
    }

    async function updateStatsLose() {
      try {
        const response = await UserService.loser(accessToken, userId.id);
        console.log(response);
      } catch (error) {
        console.log("Error updating stats.");
      }
    }

    if (gameState.round > 0 && gameState.playerHand.length === 0) {
      updateStatsWin();
      setMatchWinner("User");
      localStorage.removeItem("gameState");
      setIsGameOverModalActive(true);
    } else if (gameState.round > 0 && gameState.opponentHand.length === 0) {
      updateStatsLose();
      setMatchWinner("Opponent");
      localStorage.removeItem("gameState");
      setIsGameOverModalActive(true);
    }
    console.log(gameState);
  }, [gameState]);

  function handlePlayerCardSelection(selectedCard: CardModel) {
    setPlayerCard(selectedCard);

    let updatedPlayerHand = gameState.playerHand.filter(
      (card) => card.id !== selectedCard.id
    );

    let [updatedOpponentHand, opponentCard] = simulateOpponentMove(
      gameState,
      setOpponentCard
    );

    const winner = calculateRoundWinner(gameState, opponentCard, selectedCard);

    let setUpdatedDeck;

    if (winner === "Player") {
      const [drawnCard, updatedDeck] = drawCard(gameState.deck);
      updatedOpponentHand = [...updatedOpponentHand, drawnCard];
      setUpdatedDeck = updatedDeck;
      setPlayerPoints((prevPoints) => prevPoints + 1);
      setStatusMessage("You win this round!");
      console.log("UPDATED!!" + updatedOpponentHand);
    } else if (winner === "Opponent") {
      const [drawnCard, updatedDeck] = drawCard(gameState.deck);
      updatedPlayerHand = [...updatedPlayerHand, drawnCard];
      setUpdatedDeck = updatedDeck;
      setOpponentPoints((prevPoints) => prevPoints + 1);
      setStatusMessage("Opponent wins round!");
      console.log("UPDATED!!" + updatedPlayerHand);
    } else if (winner === "TIE") {
      setUpdatedDeck = [...gameState.deck];
      setStatusMessage("It's a tie!");
    }

    const updatedRound = gameState.round + 1;

    const updatedGameState: GameState = {
      ...gameState,
      playerPoints: playerPoints,
      opponentPoints: opponentPoints,
      playerCard: selectedCard,
      opponentCard: opponentCard,
      deck: setUpdatedDeck,
      playerHand: updatedPlayerHand,
      opponentHand: updatedOpponentHand,
      round: updatedRound,
    };
    setGameState(updatedGameState);
    localStorage.setItem("gameState", JSON.stringify(updatedGameState));
    console.log("ITITITIT" + playerPoints);
    console.log("OPPO" + opponentPoints);
  }

  function simulateOpponentMove(gameState: GameState, setOpponentCard) {
    console.log("simulateOpponentMove called");
    const { opponentHand } = gameState;
    const randomIndex = Math.floor(Math.random() * opponentHand.length);
    const selectedCard = opponentHand[randomIndex];
    setOpponentCard(selectedCard);

    const updatedOpponentHand = [...opponentHand];
    updatedOpponentHand.splice(randomIndex, 1);

    return [updatedOpponentHand, selectedCard];
  }

  function calculateRoundWinner(
    gameState: GameState,
    opponentCard: CardModel,
    playerCard: CardModel
  ) {
    console.log("Game Mode:", gameState.gameMode);
    console.log("Opponent Card Value:", opponentCard[gameState.gameMode]);
    console.log("Player Card Value:", playerCard[gameState.gameMode]);

    if (playerCard[gameState.gameMode] < opponentCard[gameState.gameMode]) {
      console.log("Opponent wins");
      const winner: string = "Opponent";
      return winner;
    } else if (
      playerCard[gameState.gameMode] > opponentCard[gameState.gameMode]
    ) {
      console.log("PLayer wins round");
      const winner: string = "Player";
      return winner;
    } else {
      console.log("It's a tie");
      const winner: string = "TIE";
      return winner;
    }
  }

  function drawCard(deck: CardModel[]) {
    const randomIndex = Math.floor(Math.random() * deck.length);
    const drawnCard = deck[randomIndex];
    const updatedDeck = [...deck];
    updatedDeck.splice(randomIndex, 1);

    return [drawnCard, updatedDeck];
  }

  return (
    <FlexContainerCentered>
      <div className="game-hand-container top">
        {gameState.opponentHand.length > 0 ? (
          gameState.opponentHand.map((card) => (
            <OpponentCard cardData={card} key={card.id} />
          ))
        ) : (
          <div className="empty-container"></div>
        )}
      </div>

      <div className="game-played-card-container">
        <div className="game-card-container">
          {playerCard ? (
            <GameCard key={playerCard.id} cardData={playerCard} />
          ) : (
            "Player's card"
          )}
        </div>
        <div className="game-card-container">
          {opponentCard ? (
            <GameCard
              key={opponentCard.id}
              cardData={opponentCard}
              opponentCard={true}
            />
          ) : (
            "Opponent's card"
          )}
        </div>
      </div>

      <div className="game-hand-container bottom">
        {gameState.playerHand.length > 0 ? (
          gameState.playerHand.map((card) => (
            <GameCard
              key={card.id}
              cardData={card}
              onClick={() => handlePlayerCardSelection(card)}
            />
          ))
        ) : (
          <div className="empty-container"></div>
        )}
      </div>
      <div className="game-status-container">
        <div>Game Mode: {gameState.gameMode}</div>
        {opponentCard ? opponentCard[gameState.gameMode] : ""}
        {opponentCard ? " vs " : ""}
        {playerCard ? playerCard[gameState.gameMode] : ""}
        <div>{statusMessage}</div>
      </div>
      {isGameOverModalActive && (
        <GameOverModal
          isGameOverModalActive={isGameOverModalActive}
          winner={matchWinner}
        />
      )}
    </FlexContainerCentered>
  );
};
