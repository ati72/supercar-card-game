import { Link } from "react-router-dom";
import { Card } from "./components/Card";
import { BASE_URL } from "../../Api/api";
import { ChangeEvent, useEffect, useState } from "react";
import { CardModel } from "../../Model/Card";
import { NewCardModal } from "./components/NewCardModal";

export const Inventory = () => {
  const accessToken: string = localStorage.getItem("jwt") || "";
  const [cards, setCards] = useState<CardModel[]>([]);
  const [isNewCardModalActive, setIsNewCardModalActive] =
    useState<boolean>(false);

  const [manufacturer, setManufacturer] = useState<string>("");
  const [minHorsepower, setMinHorsepower] = useState<string>("");
  const [maxHorsepower, setMaxHorsepower] = useState<string>("");
  const [minYear, setMinYear] = useState<string>("");
  const [maxYear, setMaxYear] = useState<string>("");
  const [minDisplacement, setMinDisplacement] = useState<string>("");
  const [maxDisplacement, setMaxDisplacement] = useState<string>("");
  const [type, setType] = useState<string>("");

  useEffect(() => {
    getCards();
  }, []);

  const getCards = async () => {
    const response = await fetch(`${BASE_URL}/cards`, {
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${accessToken}`,
      },
      method: "GET",
    });
    if (!response.ok) {
      console.log("Error while fetching cards");
      throw new Error("Error while fetching cards");
    }
    const data = await response.json();
    setCards(data);
    console.log(data);
  };

  const deleteCard = async (id: number) => {
    const response = await fetch(`${BASE_URL}/cards/delete/${id}`, {
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${accessToken}`,
      },
      method: "DELETE",
    });
    if (!response.ok) {
      console.log("Error while deleting card");
      throw new Error("Error while deleting card");
    }
    getCards();
  };

  const handleCloseModal = () => {
    document.body.classList.remove("modal-open");
    setIsNewCardModalActive(false);
  };

  const handleManufacturerChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setManufacturer(e.target.value);
  };

  const handleTypeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setType(e.target.value);
  };

  const handleMinHorsepowerChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMinHorsepower(e.target.value);
  };

  const handleMaxHorsepowerChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMaxHorsepower(e.target.value);
  };

  const handleMinYearChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMinYear(e.target.value);
  };

  const handleMaxYearChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMaxYear(e.target.value);
  };

  const handleMinDisplacementChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMinDisplacement(e.target.value);
  };

  const handleMaxDisplacementChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMaxDisplacement(e.target.value);
  };

  const filteredCards = cards
    .filter((card) =>
      manufacturer ? card.manufacturer === manufacturer : true
    )
    .filter((card) =>
      type
        ? card.type.toLowerCase().trim().includes(type.toLowerCase().trim())
        : true
    )
    .filter(
      (card) => !minHorsepower || card.horsePower >= parseInt(minHorsepower)
    )
    .filter(
      (card) => !maxHorsepower || card.horsePower <= parseInt(maxHorsepower)
    )
    .filter((card) => !minYear || card.productionYear >= parseInt(minYear))
    .filter((card) => !maxYear || card.productionYear <= parseInt(maxYear))
    .filter(
      (card) =>
        !minDisplacement ||
        card.displacement * 1000 >= parseFloat(minDisplacement)
    )
    .filter(
      (card) =>
        !maxDisplacement ||
        card.displacement * 1000 <= parseFloat(maxDisplacement)
    );

  return (
    <div className="inventory-container">
      <div className="inventory-sidebar">
        <h1>Search</h1>
        <hr style={{ marginBottom: "10px" }} />
        <div>
          <form>
            <div>
              <label htmlFor="">Manufacturer</label>
              <div>
                <select
                  className="inventory-select"
                  onChange={handleManufacturerChange}
                >
                  <option value="">All Manufacturers</option>
                  {cards.map((card) => (
                    <option key={card.id} value={card.manufacturer}>
                      {card.manufacturer}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="">Type</label>
              <div>
                <input
                  className="inventory-search-input"
                  type="text"
                  placeholder="Type"
                  value={type}
                  onChange={handleTypeChange}
                />
              </div>
            </div>
            <div>
              <label htmlFor="">Horsepower</label>
              <div className="inventory-horsepower-search-container">
                <input
                  className="inventory-hp-input"
                  type="text"
                  placeholder="Min"
                  value={minHorsepower}
                  onChange={handleMinHorsepowerChange}
                />
                <input
                  className="inventory-hp-input"
                  type="text"
                  placeholder="Max"
                  value={maxHorsepower}
                  onChange={handleMaxHorsepowerChange}
                />
              </div>
            </div>
            <div>
              <label htmlFor="">Production Year</label>
              <div className="inventory-horsepower-search-container">
                <input
                  type="text"
                  className="inventory-hp-input"
                  placeholder="Min"
                  value={minYear}
                  onChange={handleMinYearChange}
                />
                <input
                  type="text"
                  className="inventory-hp-input"
                  placeholder="Max"
                  value={maxYear}
                  onChange={handleMaxYearChange}
                />
              </div>
            </div>
            <div>
              <label htmlFor="">Engine Displacement</label>
              <div className="inventory-horsepower-search-container">
                <input
                  type="text"
                  className="inventory-hp-input"
                  placeholder="Min"
                  value={minDisplacement}
                  onChange={handleMinDisplacementChange}
                />
                <input
                  type="text"
                  className="inventory-hp-input"
                  placeholder="Max"
                  value={maxDisplacement}
                  onChange={handleMaxDisplacementChange}
                />
              </div>
            </div>
          </form>
          <Link to="../menu">
            <button className="login-button">Back</button>
          </Link>
          <button
            className="login-button"
            onClick={() => setIsNewCardModalActive(true)}
          >
            Add new card
          </button>
        </div>
      </div>
      <div className="inventory-card-container">
        {filteredCards.length < 1 ? (
          <h1>No cards found.</h1>
        ) : (
          filteredCards.map((card) => (
            <Card
              key={card.id}
              id={card.id}
              manufacturer={card.manufacturer}
              type={card.type}
              productionYear={card.productionYear}
              topSpeed={card.topSpeed}
              horsePower={card.horsePower}
              displacement={card.displacement * 1000}
              description={card.description}
              imageUrl={card.imageUrl}
              deleteCard={deleteCard}
              getCards={getCards}
            />
          ))
        )}
      </div>
      {/*modal */}
      {isNewCardModalActive && (
        <NewCardModal
          isNewCardModalActive={isNewCardModalActive}
          handleCloseModal={handleCloseModal}
          getCards={getCards}
        />
      )}
    </div>
  );
};
