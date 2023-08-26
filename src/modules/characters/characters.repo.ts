import axios from "axios";

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
