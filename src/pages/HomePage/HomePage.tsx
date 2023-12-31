import React, { useContext, useEffect, useState } from "react";
import { CharacterContext } from "../../modules/characters/characters.context";
import Header from "../../components/Header/Header";
import Pagination from "./components/Pagination/Pagination";
import { characterService } from "../../modules/characters/characters.service";
import HomeWrapper from "./components/HomeWrapper/HomeWrapper";
import "./homePage.scss";
import SideModal from "../../components/SideModal/SideModal";
import Modal from "../../components/Modal/Modal";
const HomePage = () => {
  const { setPageCount, setCharacters, queryParams, modal, sideModal } =
    useContext(CharacterContext);
  const [responseFail, setResponseFail] = useState<boolean>(false);

  useEffect(() => {
    characterService
      .getCharacters({
        name: queryParams?.name,
        page: queryParams.page,
        species: queryParams.species,
        gender: queryParams.gender,
        status: queryParams.status,
      })
      .then((response) => {
        setPageCount(response.data.info.pages);
        setCharacters(response.data.results);
        setResponseFail(false);
      })
      .catch((err) => {
        if (err.response.status > 300) setResponseFail(true);
      });
  }, [queryParams]);

  return (
    <div className="homePage">
      <Header />
      {sideModal && <SideModal />}
      {modal && <Modal />}
      {responseFail ? (
        <span>No charachters match that criteria. Try again!</span>
      ) : (
        <>
          {" "}
          <HomeWrapper />
          <Pagination />
        </>
      )}
    </div>
  );
};

export default HomePage;
