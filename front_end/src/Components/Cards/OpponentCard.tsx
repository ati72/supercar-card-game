import { CardModel } from "../../Model/Card";

export const OpponentCard: React.FC<{
  cardData: CardModel;
}> = (props) => {
  return (
    <div className="game-card" style={{ border: "3px solid red" }}>
      <div className="opponent-card-back"></div>
    </div>
  );
};
