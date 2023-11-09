import { useEffect, useState } from "react";
import { CardModel } from "../../Model/Card";
import { GameState } from "../../Model/GameState";
import { useLocation } from "react-router-dom";
import { GameCard } from "../../Components/Cards/GameCard";
import { FlexContainerCentered } from "../../Components/Layout/FlexContainerCentered";

export const Game = () => {
  const location = useLocation();
  const [gameState, setGameState] = useState(location.state);
  const [playerCard, setPlayerCard] = useState(null);
  const [opponentCard, setOpponentCard] = useState(null);

  useEffect(() => {
    console.log(gameState);
  }, [opponentCard]);

  function handlePlayerCardSelection(selectedCard: CardModel) {
    setPlayerCard(selectedCard);

    let updatedPlayerHand = gameState.playerHand.filter(
      (card) => card.id !== selectedCard.id
    );

    let [updatedOpponentHand, opponentCard] = simulateOpponentMove(
      gameState,
      setOpponentCard
    );

    console.log("Player Card:", selectedCard);
    console.log("Opponent Card:", opponentCard);
    console.log(updatedOpponentHand + "TOOOUPDATEADHAND");

    const winner = calculateRoundWinner(gameState, opponentCard, selectedCard);

    let setUpdatedDeck;

    if (winner === "Player") {
      const [drawnCard, updatedDeck] = drawCard(gameState.deck);
      updatedOpponentHand = [...updatedOpponentHand, drawnCard];
      setUpdatedDeck = updatedDeck;
      console.log("UPDATED!!" + updatedOpponentHand);
    } else if (winner === "Opponent") {
      const [drawnCard, updatedDeck] = drawCard(gameState.deck);
      updatedPlayerHand = [...updatedPlayerHand, drawnCard];
      setUpdatedDeck = updatedDeck;
      console.log("UPDATED!!" + updatedPlayerHand);
    }

    const updatedRound = gameState.round + 1;

    const updatedGameState: GameState = {
      ...gameState,
      deck: setUpdatedDeck,
      playerHand: updatedPlayerHand,
      opponentHand: updatedOpponentHand,
      round: updatedRound,
    };
    setGameState(updatedGameState);
  }

  function simulateOpponentMove(gameState: GameState, setOpponentCard) {
    console.log("simulateOpponentMove called");
    const { opponentHand } = gameState;
    // Generate a random index to select a card
    const randomIndex = Math.floor(Math.random() * opponentHand.length);

    // Get the card at the random index
    const selectedCard = opponentHand[randomIndex];

    // Set the opponent card state
    setOpponentCard(selectedCard);

    // Remove the selected card from the opponent's hand
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
      <div className="game-hand-container">
        {gameState.opponentHand.map((card) => (
          <GameCard cardData={card} key={card.id} />
        ))}
      </div>
      {playerCard && (
        <div className="game-played-card-container">
          {<GameCard key={playerCard.id} cardData={playerCard} />}
          {<GameCard key={opponentCard.id} cardData={opponentCard} />}
        </div>
      )}

      <div className="game-hand-container">
        {gameState.playerHand.map((card) => (
          <GameCard
            key={card.id}
            cardData={card}
            onClick={() => handlePlayerCardSelection(card)}
          />
        ))}
      </div>
    </FlexContainerCentered>
  );
};
