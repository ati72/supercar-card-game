import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import CardService from "../../../Api/CardService";

export const UpdateCardModal: React.FC<{
  isUpdateCardModalActive: boolean;
  handleCloseModal: () => void;
  getCards: () => void;
  id: number;
  manufacturer: string;
  type: string;
  productionYear: number;
  topSpeed: number;
  horsePower: number;
  displacement: number;
  description: string;
  imageUrl?: string;
}> = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(props.isUpdateCardModalActive);
  const ref = useRef<HTMLDialogElement | null>(null);

  const [formData, setFormData] = useState({
    manufacturer: props.manufacturer,
    type: props.type,
    productionYear: props.productionYear,
    topSpeed: props.topSpeed,
    horsePower: props.horsePower,
    displacement: props.displacement,
    description: props.description,
    imageUrl: props.imageUrl || "",
  });
  const accessToken: string = localStorage.getItem("jwt") || "";

  useEffect(() => {
    const modalElement = ref.current;
    if (modalElement) {
      if (isModalOpen) {
        modalElement.showModal();
        document.body.classList.add("modal-open");
      } else {
        modalElement.close();
      }
    }
  }, [isModalOpen]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const response = await CardService.updateCard(
        props.id,
        formData,
        accessToken
      );

      if (!response) {
        console.log("Error while submitting the form.");
        toast.error("Error while updating card.");
      }
      toast.success("Card updated.");
      props.getCards();
    } catch (error) {
      console.error("Error while submitting the form.");
    }
  };

  return (
    <dialog className="inventory-new-card-dialog" ref={ref}>
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>Update Card</h1>
      <form id="card-form" onSubmit={handleSubmit}>
        <input
          placeholder="Manufacturer"
          className="inventory-search-input"
          type="text"
          name="manufacturer"
          onChange={handleChange}
          value={formData.manufacturer}
        />
        <input
          placeholder="Type"
          className="inventory-search-input"
          type="text"
          name="type"
          onChange={handleChange}
          value={formData.type}
        />
        <input
          placeholder="Production Year"
          className="inventory-search-input"
          type="number"
          name="productionYear"
          onChange={handleChange}
          value={formData.productionYear}
        />
        <input
          placeholder="Top Speed"
          className="inventory-search-input"
          type="number"
          name="topSpeed"
          onChange={handleChange}
          value={formData.topSpeed}
        />
        <input
          placeholder="Horsepower"
          className="inventory-search-input"
          type="number"
          name="horsePower"
          onChange={handleChange}
          value={formData.horsePower}
        />
        <input
          placeholder="Displacement"
          className="inventory-search-input"
          type="number"
          name="displacement"
          onChange={handleChange}
          value={formData.displacement}
        />
        <input
          placeholder="Image URL"
          className="inventory-search-input"
          type="text"
          name="imageUrl"
          onChange={handleChange}
          value={formData.imageUrl || ""}
        />
        <textarea
          className="inventory-textarea"
          placeholder="Description"
          name="description"
          form="card-form"
          value={formData.description}
          onChange={handleChange}
        ></textarea>
        <div>
          <button className="login-button" type="submit">
            Submit
          </button>
        </div>
        <div>
          <button className="login-button" onClick={props.handleCloseModal}>
            Close
          </button>
        </div>
      </form>
    </dialog>
  );
};
