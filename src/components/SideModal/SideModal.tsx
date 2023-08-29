import React, { useContext } from "react";
import "./sideModal.scss";
import { Button, Input, Select, Space } from "antd";
import {
  CharacterContext,
  
} from "../../modules/characters/characters.context";
import { QueryParams } from "../../modules/characters/characters.types";

// no need to be in component
const resetParams: QueryParams = {
  page: 1,
  name: "",
  gender: "",
  species: "",
  status: "",
};

const SideModal = () => {
  const { Search } = Input;
  const { setSideModal, setQueryParams, queryParams } =
    useContext(CharacterContext);
  
  function filterCharacters(filterObject: QueryParams) {
    setQueryParams({
      page: 1,
      name: queryParams.name,
      gender: filterObject.gender,
      species: filterObject.species,
      status: filterObject.status,
    });
  }
  
  // misleading, should be named searchTimeout to avoid confusion
  let search: any;

  return (
    <div className="sideModalWrapper" onClick={() => setSideModal(false)}>
      <div className="sideModalContent" onClick={(e) => e.stopPropagation()}>
        <Space direction="vertical">
          <p>Filter characters by:</p>
          <Search
            placeholder="Species"
            style={{ width: 200 }}
            onChange={(e: any) => {
              clearTimeout(search);
              search = setTimeout(() => {
                filterCharacters({
                  ...queryParams,
                  page: 1,
                  species: e.target.value,
                });
              }, 500);
            }}
          />
          <Select
            onChange={(value: string) =>
              filterCharacters({
                ...queryParams,
                page: 1,
                gender: value,
              })
            }
            style={{ width: "100%" }}
            placeholder={"Gender"}
            // put options in character.constants.ts then import here
            options={[
              { value: "Male", label: "Male" },
              { value: "Female", label: "Female" },
            ]}
          />
          <Select
            onChange={(value: string) =>
              filterCharacters({
                ...queryParams,
                page: 1,
                status: value,
              })
            }
            style={{ width: "100%" }}
            placeholder={"Status"}
            // put options in character.constants.ts then import here
            options={[
              { value: "Dead", label: "Dead" },
              { value: "Alive", label: "Alive" },
              { value: "unkown", label: "Unkown" },
            ]}
          />

          <Button onClick={() => setQueryParams(resetParams)}>
            Reset filters
          </Button>
        </Space>
      </div>
    </div>
  );
};

export default SideModal;
