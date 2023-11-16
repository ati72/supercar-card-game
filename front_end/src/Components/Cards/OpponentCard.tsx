import { CardModel } from "../../Model/Card";

export const OpponentCard: React.FC<{
  cardData: CardModel;
}> = (props) => {
  return (
    <div className="game-card">
      <div className="opponent-card-back"></div>
    </div>
  );
};
