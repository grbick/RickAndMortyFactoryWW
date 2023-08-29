import React, { useContext } from "react";
import "./characterCard.scss";
import { Card, Input, Typography, Select, Form, Button } from "antd";
import { StarOutlined, StarFilled, EditOutlined } from "@ant-design/icons";
import { useMediaQuery } from "react-responsive";
import {
  
  CharacterContext,
} from "../../modules/characters/characters.context";
import { useLocation } from "react-router-dom";
import { Character } from "../../modules/characters/characters.types";
interface CardPropsType {
  character: Character;
}

// example localStorage helper

export class LocalStorageService {

  getItem(key: string) {
    const item = localStorage.getItem(key);
    return (item) ? JSON.parse(item) : null;
  }

  setItem(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  clear() {
    localStorage.clear();
  }
}

// end of example


// order/mess of these expressions seems weird, 
// see if it could be cleaned up a little bit or put into some sensible order

const CharacterCard: React.FC<CardPropsType> = (props) => {
  const isGrid = useMediaQuery({ query: "(min-width:650px)" });
  const { favorites, setFavorites, modal, setModal } =
    useContext(CharacterContext);
  const { Meta } = Card;
  const { Title } = Typography;
  // should move logic to .service
  const isFavorite = favorites.some((char) => char.id === props.character.id);
  function addToFavorites(e: any) {
    e?.stopPropagation();
    const newFavorites = isFavorite
    // should move logic to .service
      ? favorites.filter((char) => char.id !== props.character.id)
      : [...favorites, props.character];
    setFavorites(newFavorites);

    // try and create a helper file inside of a "lib" folder, it should handle all storage manipulation
    sessionStorage.setItem("favorites", JSON.stringify(newFavorites));
  }
  const location = useLocation();
  
  
  const isFavoritesPage = location.pathname === "/favorites";
  function changeGender(value: string) {
    form.setFieldValue("gender", value);
  }
  function changeStatus(value: string) {
    form.setFieldValue("status", value);
  }
  const [form] = Form.useForm();
  const initialFormValues = {
    name: props.character.name,
    gender: props.character.gender,
    species: props.character.species,
    status: props.character.status,
  };
  function onSubmitForm(values: any) {
    props.character.name = values.name;
    props.character.gender = values.gender;
    props.character.species = values.species;
    props.character.status = values.status;
    setModal(null);
  }

  return (
    <Card
      onClick={() => (isFavoritesPage ? null : setModal(props.character))}
      style={
        isGrid
          ? { width: "300px", margin: "10px auto" }
          : { width: "80%", margin: "10px auto" }
      }
      cover={<img alt="character" src={props.character.image} />}
      actions={
        // move logic out of HTML, this makes it extra unreadable
        isFavoritesPage
          ? modal
            ? []
            : [
                <StarFilled key={"removeFav"} onClick={addToFavorites} />,
                <EditOutlined onClick={() => setModal(props.character)} />,
              ]
          : isFavorite
          ? [<StarFilled key={"removeFav"} onClick={addToFavorites} />]
          : [<StarOutlined key={"addFav"} onClick={addToFavorites} />]
      }
    >
      {!modal && !isFavoritesPage && (
        <Meta
          title={
            <Title level={5} style={{ whiteSpace: "normal" }}>
              {props.character.name}
            </Title>
          }
          description={props.character.status}
        />
      )}
      {modal && isFavoritesPage ? (
        <Card type="inner" size="small" style={{ textAlign: "left" }}>
          <Form
            form={form}
            onFinish={onSubmitForm}
            initialValues={initialFormValues}
          >
            <Form.Item
              name={"name"}
              label={"Name"}
              style={{ marginBottom: "0px" }}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name={"species"}
              label={"Species"}
              style={{ marginBottom: "0px" }}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="gender"
              label={"Gender"}
              style={{ marginBottom: "0px" }}
            >
              <Select
                onChange={changeGender}
                style={{ width: "100%" }}
                options={[
                  { value: "Male", label: "Male" },
                  { value: "Female", label: "Female" },
                ]}
              />
            </Form.Item>
            <Form.Item
              name="status"
              label={"Status"}
              style={{ marginBottom: "20px" }}
            >
              <Select
                onChange={changeStatus}
                style={{ width: "100%" }}
                options={[
                  { value: "Alive", label: "Alive" },
                  { value: "Dead", label: "Dead" },
                  { value: "Unknown", label: "Unknown" },
                ]}
              />
            </Form.Item>
            <Form.Item style={{ textAlign: "center" }}>
              <Button htmlType="submit" type="primary">
                Change Info
              </Button>
            </Form.Item>
          </Form>
        </Card>
      ) : (
        ((modal && !isFavoritesPage) || isFavoritesPage) && (
          <Card type="inner" size="small" style={{ textAlign: "left" }}>
            <p>Name: {props.character.name}</p>
            <p>Status: {props.character.status}</p>
            <p>Species: {props.character.species}</p>
            <p>Gender: {props.character.gender}</p>
            <p>Last known location: {props.character.location.name}</p>
          </Card>
        )
      )}
    </Card>
  );
};

export default CharacterCard;
