import defaultCarImage from "../../../assets/default-car.png";

// TODO: image should be smaller, leave space for background

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
  deleteCard: any;
}> = (props) => {
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
        <button>Edit</button>
        <button onClick={() => props.deleteCard(props.id)}>Delete</button>
      </div>
    </div>
  );
};
