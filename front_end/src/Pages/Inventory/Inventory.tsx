import { Link } from "react-router-dom";
import { Card } from "./components/Card";
import { ChangeEvent, useEffect, useState } from "react";
import { CardModel } from "../../Model/Card";
import { NewCardModal } from "./components/NewCardModal";
import { UserInfo } from "../../Model/UserInfo";
import CardService from "../../Api/CardService";

export const Inventory = () => {
  const accessToken: string = localStorage.getItem("jwt") || "";
  const userInfo: UserInfo = JSON.parse(
    localStorage.getItem("userInfo") || "{}"
  );
  const isAdmin: boolean = userInfo.authorities.some(
    (auth) => auth.authority === "ADMIN"
  );
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
    fetchCards();
  }, []);

  async function fetchCards() {
    try {
      const cards = await CardService.getCards(accessToken);
      setCards(cards);
      console.log(cards);
    } catch (error) {
      console.log("Error fetching cards.");
      throw new Error(`Request failed`);
    }
  }

  async function deleteCard(id: number) {
    try {
      await CardService.deleteCard(id, accessToken);
      fetchCards();
    } catch (error) {
      console.log("Error deleting cards");
      throw new Error("Request failed");
    }
  }

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
        !minDisplacement || card.displacement >= parseInt(minDisplacement)
    )
    .filter(
      (card) =>
        !maxDisplacement || card.displacement <= parseInt(maxDisplacement)
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
          {isAdmin && (
            <button
              className="login-button"
              onClick={() => setIsNewCardModalActive(true)}
            >
              Add new card
            </button>
          )}
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
              displacement={card.displacement}
              description={card.description}
              imageUrl={card.imageUrl}
              isAdmin={isAdmin}
              deleteCard={deleteCard}
              getCards={fetchCards}
            />
          ))
        )}
      </div>
      {/*modal */}
      {isNewCardModalActive && (
        <NewCardModal
          isNewCardModalActive={isNewCardModalActive}
          handleCloseModal={handleCloseModal}
          getCards={fetchCards}
        />
      )}
    </div>
  );
};
