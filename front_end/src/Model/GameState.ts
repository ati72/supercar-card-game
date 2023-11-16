import { CardModel } from "./Card";

export class GameState {
  gameMode: string;
  deck: CardModel[];
  playerHand: CardModel[];
  opponentHand: CardModel[];
  playerCard: CardModel;
  opponentCard: CardModel;
  round: number = 0;
  isGameOver: boolean;
  playerPoints: number;
  opponentPoints: number;

  constructor(
    gameMode: string,
    deck: CardModel[],
    playerHand: CardModel[],
    opponentHand: CardModel[],
    playerCard: CardModel,
    opponentCard: CardModel,
    round: number,
    isGameOver: boolean,
    playerPoints: number,
    opponentPoints: number
  ) {
    this.gameMode = gameMode;
    this.deck = deck;
    this.playerHand = playerHand;
    this.opponentHand = opponentHand;
    this.playerCard = playerCard;
    this.opponentCard = opponentCard;
    this.round = round;
    this.isGameOver = isGameOver;
    this.playerPoints = playerPoints;
    this.opponentPoints = opponentPoints;
  }
}
