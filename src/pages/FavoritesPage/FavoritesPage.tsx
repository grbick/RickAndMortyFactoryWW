import React, { useContext } from "react";
import Header from "../../components/Header/Header";
import "./favoritesPage.scss";
import FavoritesWrapper from "./components/FavoritesWrapper/FavoritesWrapper";
import Modal from "../../components/Modal/Modal";
import { CharacterContext } from "../../modules/characters/characters.context";

const FavoritesPage = () => {
  const { modal } = useContext(CharacterContext);

  return (
    <div className="favoritesPage">
      {modal && <Modal />}
      <Header />
      <FavoritesWrapper />
    </div>
  );
};

export default FavoritesPage;
