import React, { useEffect } from "react";
import { CardModel } from "../../Model/Card";
import { GameState } from "../../Model/GameState";
import { Card } from "../Inventory/components/Card";
import { useLocation } from "react-router-dom";
import { GameCard } from "../../Components/Cards/GameCard";

export const Game = () => {
  const location = useLocation();
  const gameState: GameState = location.state;

  useEffect(() => {
    console.log(gameState);
  }, []);

  return (
    <div>
      <div className="game-hand-container">
        {gameState.opponentHand.map((card) => (
          <GameCard cardData={card} />
        ))}
      </div>
      <div className="game-hand-container">
        {gameState.playerHand.map((card) => (
          <GameCard cardData={card} />
        ))}
      </div>
    </div>
  );
};
