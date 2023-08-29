import axios from "axios";

// ideally this goes in characters.constants.ts
const userCredentials = {
  username: "rick",
  password: "morty",
};

const getCharacters = (params: any) => {
  return axios.get("https://rickandmortyapi.com/api/character/", { params });
};

export const characterRepo = {
  getCharacters,
  userCredentials,
};
