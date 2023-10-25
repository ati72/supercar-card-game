import { useState } from "react";
import defaultCarImage from "../../../assets/default-car.png";
import { UpdateCardModal } from "./UpdateCardModal";

export const Card: React.FC<{
  id: number;
  manufacturer: string;
  type: string;
  productionYear: number;
  topSpeed: number;
  horsePower: number;
  displacement: number;
  description: string;
  imageUrl?: string;
  isAdmin: boolean;
  deleteCard: (id: number) => void;
  getCards: () => void;
}> = (props) => {
  const [isUpdateCardModalActive, setIsUpdateCardModalActive] = useState(false);

  const handleOpenUpdateCardModal = () => {
    setIsUpdateCardModalActive(true);
  };

  const handleCloseUpdateCardModal = () => {
    setIsUpdateCardModalActive(false);
  };

  return (
    <div className="inventory-card">
      <img
        className="inventory-card-image"
        src={defaultCarImage}
        alt="Car Image"
      />
      <div className="inventory-card-details">
        <div>
          <h3 style={{ color: "var(--green)" }}>{props.manufacturer}</h3>
          <h3 style={{ color: "var(--green)" }}>{props.type}</h3>
        </div>

        <hr />
        <p style={{ color: "var(--blue)" }}>
          Production year: {props.productionYear}
        </p>
        <p style={{ color: "var(--blue)" }}>Horsepower: {props.horsePower}</p>
        <p style={{ color: "var(--blue)" }}>Top Speed: {props.topSpeed} km/h</p>
        <p style={{ color: "var(--blue)" }}>
          Engine Displacement: {props.displacement} cc
        </p>
        {props.isAdmin && (
          <>
            <button onClick={() => handleOpenUpdateCardModal()}>Edit</button>
            <button onClick={() => props.deleteCard(props.id)}>Delete</button>
          </>
        )}
      </div>
      {/*UPDATE MODAL */}
      {isUpdateCardModalActive && (
        <UpdateCardModal
          key={props.id}
          isUpdateCardModalActive={isUpdateCardModalActive}
          handleCloseModal={handleCloseUpdateCardModal}
          getCards={props.getCards}
          id={props.id}
          manufacturer={props.manufacturer}
          type={props.type}
          productionYear={props.productionYear}
          topSpeed={props.topSpeed}
          horsePower={props.horsePower}
          displacement={props.displacement}
          description={props.description}
          imageUrl={props.imageUrl}
        />
      )}
    </div>
  );
};
