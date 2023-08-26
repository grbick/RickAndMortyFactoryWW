import React, { useContext } from "react";
import "./homeWrapper.scss";
import { Character, CharacterContext } from "../../../../modules/characters/characters.context";
import CharacterCard from "../../../../components/CharacterCard/CharacterCard";

const HomeWrapper = () => {
  const { characters} = useContext(CharacterContext);

  return (
    <div className="homeWrapper">
      {characters?.map(
        (
          char: Character,
          i: React.Key | null
        ) => (
          <CharacterCard
            key={i}
            character={char}
          />
        )
      )}
    </div>
  );
};

export default HomeWrapper;
