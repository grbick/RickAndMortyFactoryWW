import { characterRepo } from "./characters.repo";

// move to characters.types.ts
interface IGetCharactersUrlParams {
  page?: number;
  name?: string;
}

class CharacterService {
  getCharacters = (params: IGetCharactersUrlParams) => {
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
}

export const characterService = new CharacterService();
