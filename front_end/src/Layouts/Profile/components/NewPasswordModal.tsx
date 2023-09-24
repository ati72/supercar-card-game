import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import { BASE_URL } from "../../../Api/api";

export const NewPasswordModal: React.FC<{
  isNewPasswordModalActive: boolean;
  handleCloseModal: () => void;
  username: string;
}> = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(
    props.isNewPasswordModalActive
  );

  const ref = useRef<HTMLDialogElement | null>(null);

  const initialFormData = {
    username: props.username,
    oldPassword: "",
    newPassword: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const accessToken: string = localStorage.getItem("jwt") || "";

  useEffect(() => {
    const modalElement = ref.current;

    if (modalElement) {
      if (isModalOpen) {
        modalElement.showModal();
        document.body.classList.add("modal-open");
        console.log(props.username + "asd");
      } else {
        modalElement.close();
      }
    }
  }, [isModalOpen]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const { username, oldPassword, newPassword } = formData;

    if (formData.oldPassword.trim() === "") {
      alert("Old password needed");
      return;
    }

    if (formData.newPassword.trim() === "") {
      alert("New password needed");
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/user/changePassword`, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ username, oldPassword, newPassword }),
      });

      if (response.ok) {
        alert("Password changed");
        setFormData(initialFormData);
      } else {
        alert("Request failed");
      }
    } catch (error) {
      console.log("Error " + error);
    }
  };

  return (
    <dialog className="profile-new-password-dialog" ref={ref}>
      <h1 style={{ textAlign: "center", paddingBottom: "10px" }}>
        Change Password
      </h1>
      <form id="new-password-form" onSubmit={handleSubmit}>
        <input
          hidden
          type="text"
          name="username"
          defaultValue={props.username}
        />
        <input
          type="password"
          name="oldPassword"
          placeholder="Old Password"
          onChange={handleChange}
          className="inventory-search-input"
          value={formData.oldPassword}
        />
        <input
          type="password"
          name="newPassword"
          placeholder="New Password"
          onChange={handleChange}
          className="inventory-search-input"
          value={formData.newPassword}
        />
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
