import React, { useEffect } from "react";
import { CardModel } from "../../Model/Card";
import { GameState } from "../../Model/GameState";
import { Card } from "../Inventory/components/Card";
import { useLocation, useNavigate } from "react-router-dom";

export const Game = () => {
  const location = useLocation();
  const gameState = location.state;

  useEffect(() => {
    console.log(gameState);
  }, []);

  return (
    <div>
      <div className="game-opponent-hand">
        {gameState.opponentHand.map((card) => (
          <h1>{card.manufacturer}</h1>
        ))}
      </div>
      <div className="game-player-hand">
        {gameState.playerHand.map((card) => (
          <h1>{card.manufacturer}</h1>
        ))}
      </div>
    </div>
  );
};
