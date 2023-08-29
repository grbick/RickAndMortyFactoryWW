import { characterRepo } from './characters.repo';
import { QueryParams } from './characters.types';

class CharacterService {
  getCharacters = (params: QueryParams) => {
    return characterRepo.getCharacters(params);
  };

  getInitialFavoritesFromLocalStorage = () => {
    const favoritesFromSession = sessionStorage.getItem('favorites');
    return favoritesFromSession ? JSON.parse(favoritesFromSession) : [];
  };

  checkCredentials = (
    username: string | undefined,
    password: string | undefined
  ) => {
    // if (
    //   username === characterRepo.userCredentials.username &&
    //   password === characterRepo.userCredentials.password
    // )
    //   return true;
    // else return false;

    // return evaluated expresion instead of redundant "if else"

    return (
      username === characterRepo.userCredentials.username &&
      password === characterRepo.userCredentials.password
    );
  };
}

export const characterService = new CharacterService();
