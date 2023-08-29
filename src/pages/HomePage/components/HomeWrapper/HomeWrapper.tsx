import React, { useContext } from "react";
import "./homeWrapper.scss";
import {
  
  CharacterContext,
} from "../../../../modules/characters/characters.context";
import CharacterCard from "../../../../components/CharacterCard/CharacterCard";
import { Character } from "../../../../modules/characters/characters.types";

const HomeWrapper = () => {
  const { characters } = useContext(CharacterContext);

  return (
    <div className="homeWrapper">
      {characters?.map((char: Character, i: React.Key | null) => (
        <CharacterCard key={i} character={char} />
      ))}
    </div>
  );
};

export default HomeWrapper;
