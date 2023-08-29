import React, { useContext } from "react";
import "./favoritesWrapper.scss";
import {
  
  CharacterContext,
} from "../../../../modules/characters/characters.context";
import CharacterCard from "../../../../components/CharacterCard/CharacterCard";
import Loading from "../../../../components/Loading/Loading";
import { Character } from "../../../../modules/characters/characters.types";
const FavoritesWrapper = () => {
  const { favorites } = useContext(CharacterContext);
  
  // no need to assign to const
  const anyFavorites = favorites.length;

  if (!favorites) {
    return <Loading />;
  }

  return (
    <div className="favoritesWrapper">
      {/* access it directly instead */}
      {favorites.length ? (
        favorites?.map((char: Character, i: React.Key | null) => (
          <CharacterCard key={i} character={char} />
        ))
      ) : (
        <span>
          There are no favorites selected.
          <br /> Go back to home page and select your favorite character!
        </span>
      )}
    </div>
  );
};

export default FavoritesWrapper;
