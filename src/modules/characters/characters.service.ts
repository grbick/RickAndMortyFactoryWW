import { Character, QueryParams } from "./characters.context";
import { characterRepo } from "./characters.repo";

class CharacterService {
  getCharacters = (params: QueryParams) => {
    return characterRepo.getCharacters(params);
  };

  checkCredentials = (
    username: string | undefined,
    password: string | undefined
  ) => {
    if (
      username === characterRepo.userCredentials.username &&
      password === characterRepo.userCredentials.password
    )
      return true;
    else return false;
  };

  removeFromFavorites(favorites: Character[], charId: number) {
    return favorites.filter((char) => char.id !== charId);
  }
}

export const characterService = new CharacterService();
