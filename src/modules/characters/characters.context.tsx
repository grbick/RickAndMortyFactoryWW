import React, { useState, createContext } from "react";

export interface ApiData {
  results: Character[];
}

export interface Character {
  id: number;
  age: number;
  name: string;
  status: "dead" | "alive" | "unknown";
  gender: string;
  image: string;
}

export interface QueryParams {
  page: number;
  name: string;
}

type characterContextType = {
  characters: ApiData["results"] | null;
  setCharacters: React.Dispatch<
    React.SetStateAction<ApiData["results"] | null>
  >;
  userInfo: boolean;
  setUserInfo: React.Dispatch<React.SetStateAction<boolean>>;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  pageCount: number;
  setPageCount: React.Dispatch<React.SetStateAction<number>>;
  queryParams: QueryParams;
  setQueryParams: React.Dispatch<React.SetStateAction<QueryParams>>;
  favorites: Character[];
  setFavorites: React.Dispatch<React.SetStateAction<Character[]>>;
};
type CharacterProviderProps = {
  children: React.ReactNode;
};

export const CharacterContext = createContext<characterContextType>(
  null as any
);
export const CharacterProvider = ({ children }: CharacterProviderProps) => {
  const [characters, setCharacters] = useState<ApiData["results"] | null>(null);
  const infoFromSession = sessionStorage.getItem("userInfo");
  const initialInfo = infoFromSession ? JSON.parse(infoFromSession) : false;
  const [userInfo, setUserInfo] = useState<boolean>(initialInfo);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageCount, setPageCount] = useState<number>(1);
  const [queryParams, setQueryParams] = useState<QueryParams>({
    page: 1,
    name: "",
  });
  const favoritesFromSession = sessionStorage.getItem("favorites");
  const initialFavorites = favoritesFromSession
    ? JSON.parse(favoritesFromSession)
    : [];
  const [favorites, setFavorites] = useState<Character[]>(initialFavorites);

  return (
    <CharacterContext.Provider
      value={{
        characters,
        setCharacters,
        userInfo,
        setUserInfo,
        currentPage,
        setCurrentPage,
        pageCount,
        setPageCount,
        queryParams,
        setQueryParams,
        favorites,
        setFavorites,
      }}
    >
      {children}
    </CharacterContext.Provider>
  );
};
