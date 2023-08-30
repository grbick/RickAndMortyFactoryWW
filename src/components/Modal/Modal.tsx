import React, { useContext } from "react";
import "./modal.scss";
import { CharacterContext } from "../../modules/characters/characters.context";
import { CharacterCard } from "../CharacterCard/CharacterCard";
import { Button } from "antd";
import { useMediaQuery } from "react-responsive";

const Modal = () => {
  const { modal, setModal, favorites } = useContext(CharacterContext);

  const isFavorite = favorites.some((char) => char.id === modal?.id);
  const isGrid = useMediaQuery({ query: "(min-width:650px)" });

  return (
    <div className="modalWrapper" onClick={() => setModal(null)}>
      <div
        className="modalContent"
        style={isGrid ? { width: "fit-content" } : { width: "70%" }}
        onClick={(e) => e.stopPropagation()}
      >
        <Button
          onClick={() => setModal(null)}
          style={{
            position: "absolute",
            top: "0",
            right: "0",
            color: "red",
          }}
        >
          X
        </Button>
        <CharacterCard character={modal!} />
      </div>
    </div>
  );
};

export default Modal;
