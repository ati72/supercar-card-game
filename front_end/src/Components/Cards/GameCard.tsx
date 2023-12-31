import { CardModel } from "../../Model/Card";
import defaultCarImage from "../../assets/default-car.png";

export const GameCard: React.FC<{
  cardData: CardModel;
  onClick?: () => void;
  opponentCard?: boolean;
}> = (props) => {
  return (
    <div
      className="game-card"
      onClick={props.onClick}
      style={{ border: props.opponentCard ? "3px solid red" : "" }}
    >
      <img
        className="inventory-card-image"
        src={
          props.cardData.imageUrl ? props.cardData.imageUrl : defaultCarImage
        }
        alt="Car Image"
      />
      <div className="inventory-card-details">
        <div>
          <h3 style={{ color: "var(--green)" }}>
            {props.cardData.manufacturer}
          </h3>
          <h3 style={{ color: "var(--green)" }}>{props.cardData.type}</h3>
        </div>

        <hr />
        <p style={{ color: "var(--blue)" }}>
          Production year: {props.cardData.productionYear}
        </p>
        <p style={{ color: "var(--blue)" }}>
          Horsepower: {props.cardData.horsePower}
        </p>
        <p style={{ color: "var(--blue)" }}>
          Top Speed: {props.cardData.topSpeed} km/h
        </p>
        <p style={{ color: "var(--blue)" }}>
          Engine Displacement: {props.cardData.displacement} L
        </p>
      </div>
    </div>
  );
};
