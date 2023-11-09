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

    const updatedPlayerHand = gameState.playerHand.filter(
      (card) => card.id !== selectedCard.id
    );

    const [updatedOpponentHand, opponentCard] = simulateOpponentMove(
      gameState,
      setOpponentCard,
      setGameState
    );

    console.log("Player Card:", selectedCard);
    console.log("Opponent Card:", opponentCard);

    const updatedGameState = {
      ...gameState,
      playerHand: updatedPlayerHand,
      opponentHand: updatedOpponentHand,
    };
    setGameState(updatedGameState);

    calculateRoundWinner(gameState, opponentCard, selectedCard);
  }

  function simulateOpponentMove(
    gameState: GameState,
    setOpponentCard,
    setGameState
  ) {
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
      const [drawnCard, updatedDeck] = drawCard(gameState.deck);
      const updatedOpponentHand = [gameState.opponentHand, drawnCard];
      const updatedGameState = {
        ...gameState,
        opponentHand: updatedOpponentHand,
        deck: updatedDeck,
      };
      setGameState(updatedGameState);
    } else if (
      playerCard[gameState.gameMode] > opponentCard[gameState.gameMode]
    ) {
      const [drawnCard, updatedDeck] = drawCardFromDeck(gameState.deck);
      const updatedPlayerHand = [...gameState.playerHand, drawnCard];

      const updatedGameState = {
        ...gameState,
        playerHand: updatedPlayerHand,
        deck: updatedDeck,
      };

      setGameState(updatedGameState);
      console.log("PLayer wins round");
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
