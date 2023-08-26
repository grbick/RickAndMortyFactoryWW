import React, { useContext } from "react";
import "./characterCard.scss";
import { Card, Avatar } from "antd";
import { useMediaQuery } from "react-responsive";
import {
  Character,
  CharacterContext,
} from "../../modules/characters/characters.context";
import removeFavorite from "../../assets/favorite.png";
import addFavorite from "../../assets/favorite (1).png";

interface CardPropsType {
  character: Character;
}

const CharacterCard: React.FC<CardPropsType> = (props) => {
  const isGrid = useMediaQuery({ query: "(min-width:650px)" });
  const { favorites, setFavorites } = useContext(CharacterContext);
  const { Meta } = Card;
  const isFavorite = favorites.some((char) => char.id === props.character.id);
  function addToFavorites() {
    const newFavorites = isFavorite
      ? favorites.filter((char) => char.id !== props.character.id)
      : [...favorites, props.character];
    setFavorites(newFavorites);
    sessionStorage.setItem("favorites", JSON.stringify(newFavorites));
  }

  return (
    <Card
      onClick={addToFavorites}
      style={
        isGrid
          ? { width: "300px", margin: "10px auto" }
          : { width: "80%", margin: "10px auto" }
      }
      cover={<img alt="character" src={props.character.image} />}
    >
      <Meta
        avatar={
          <Avatar
            shape={"square"}
            src={isFavorite ? removeFavorite : addFavorite}
          />
        }
        title={props.character.name}
        description={props.character.status}
      />
    </Card>
  );
};

export default CharacterCard;
