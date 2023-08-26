import React, { useContext } from "react";
import "./favoritesWrapper.scss";
import {
  Character,
  CharacterContext,
} from "../../../../modules/characters/characters.context";
import CharacterCard from "../../../../components/CharacterCard/CharacterCard";
const FavoritesWrapper = () => {
  const { favorites } = useContext(CharacterContext);
  // console.log(favorites)?

  return (
    <div className="favoritesWrapper">
      {favorites?.map((char: Character, i: React.Key | null) => (
        <CharacterCard key={i} character={char} />
      ))}
    </div>
  );
};

export default FavoritesWrapper;
