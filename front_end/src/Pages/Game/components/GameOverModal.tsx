import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

export const GameOverModal: React.FC<{
  isGameOverModalActive: boolean;
  winner: string;
}> = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(props.isGameOverModalActive);
  const ref = useRef<HTMLDialogElement | null>(null);

  useEffect(() => {
    const modalElement = ref.current;
    if (modalElement) {
      if (isModalOpen) {
        modalElement.showModal();
      } else {
        modalElement.close();
      }
    }
  }, [isModalOpen]);

  return (
    <dialog
      className="profile-new-password-dialog"
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
      ref={ref}
    >
      <h1 style={{ textAlign: "center", paddingBottom: "10px" }}>
        {props.winner === "User" ? "You Won" : "You Lost"}
      </h1>
      <div>
        <Link to="../play">
          <button className="login-button">New Game</button>
        </Link>
      </div>
      <div>
        <Link to="../menu">
          <button className="login-button">Back</button>
        </Link>
      </div>
    </dialog>
  );
};
