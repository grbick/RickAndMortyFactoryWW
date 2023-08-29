import React, { useState, createContext } from 'react';
import { ApiData, Character, QueryParams } from './characters.types';
import { characterService } from './characters.service';

// This type should stay here beacuse its specific to react Context functionality
// and describes only this context, therefore it is not a part of bussiness logic
// that usually goes into characters.types.ts

type characterContextType = {
  characters: ApiData['results'] | null;
  setCharacters: React.Dispatch<
    React.SetStateAction<ApiData['results'] | null>
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
  sideModal: boolean;
  setSideModal: React.Dispatch<React.SetStateAction<boolean>>;
  modal: Character | null;
  setModal: React.Dispatch<React.SetStateAction<Character | null>>;
};
type CharacterProviderProps = {
  children: React.ReactNode;
};

export const CharacterContext = createContext<characterContextType>(
  null as any
);

// keep similiar funcionalities grouped
// here useState statements would go on top, then other computed values below them
export const CharacterProvider = ({ children }: CharacterProviderProps) => {
  const infoFromSession = sessionStorage.getItem('userInfo');
  const initialInfo = infoFromSession ? JSON.parse(infoFromSession) : false;

  // this should be a service function
  // const favoritesFromSession = sessionStorage.getItem('favorites');
  // const initialFavorites = favoritesFromSession
  //   ? JSON.parse(favoritesFromSession)
  //   : [];

  const [characters, setCharacters] = useState<ApiData['results'] | null>(null);
  const [userInfo, setUserInfo] = useState<boolean>(initialInfo);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageCount, setPageCount] = useState<number>(1);

  const [queryParams, setQueryParams] = useState<QueryParams>({
    page: 1,
    name: '',
  });
  
  
  const [favorites, setFavorites] = useState<Character[]>(
    characterService.getInitialFavoritesFromLocalStorage()
  );
  const [modal, setModal] = useState<Character | null>(null);
  const [sideModal, setSideModal] = useState<boolean>(false);

  // Why do this? This is acceptable when you want to explicitly say that two types/interfaces
  // have the same structure, but are completely different things
  type NewType = QueryParams;

  // example
  interface IGlass {
    handleShape: string;
    material: string;
  }

  type IBowl = IGlass;

  // end of example

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
        modal,
        setModal,
        sideModal,
        setSideModal,
      }}
    >
      {children}
    </CharacterContext.Provider>
  );
};
