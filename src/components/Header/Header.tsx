import { Button, Image, Input, Space, Dropdown } from "antd";
import React, { useContext } from "react";
import "./header.scss";
import { CharacterContext } from "../../modules/characters/characters.context";
import logo from "../../assets/Rick and Morty Logo Vector.png";
import type { MenuProps } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { useMediaQuery } from "react-responsive";

const Header = () => {
  const { Search } = Input;
  const { setUserInfo, setQueryParams, setSideModal } =
    useContext(CharacterContext);
  let search: any;

  function logout() {
    setUserInfo(false);
    sessionStorage.setItem("userInfo", "false");
  }

  function filterCharactersByName(name: string) {
    setQueryParams({
      name: name,
      page: 1,
    });
  }

  const isDropdown = useMediaQuery({ query: "(min-width:760px)" });
  const items: MenuProps["items"] = [
    {
      label: (
        <Button href="/home" type="link">
          Home Page
        </Button>
      ),
      key: "0",
    },
    {
      label: (
        <Button href="/favorites" type="link">
          Favorites
        </Button>
      ),
      key: "1",
    },
    {
      label: (
        <Button
          type="link"
          onClick={() => setSideModal((prevState: boolean) => !prevState)}
        >
          Filter Characters
        </Button>
      ),
      key: "2",
    },
    {
      label: (
        <Button type="primary" onClick={logout}>
          Log Out
        </Button>
      ),
      key: "3",
    },
  ];

  return (
    <div className="header">
      <div>
        <Image src={logo} width={200} />
        {isDropdown ? (
          <Space>
            <Button href="/home" type="link">
              Home Page
            </Button>
            <Button href="/favorites" type="link">
              Favorites
            </Button>
            <Button
              type="link"
              onClick={() => setSideModal((prevState: boolean) => !prevState)}
            >
              Filter Characters
            </Button>
            <Button type="primary" onClick={logout}>
              Log Out
            </Button>
          </Space>
        ) : (
          <>
            <Dropdown menu={{ items }} trigger={["click"]}>
              <Space>
                <Button type="link">
                  Options
                  <DownOutlined />
                </Button>
              </Space>
            </Dropdown>{" "}
          </>
        )}
      </div>
      <Search
        placeholder="search characters"
        style={{ width: 200 }}
        onChange={(e: any) => {
          clearTimeout(search);
          search = setTimeout(() => {
            filterCharactersByName(e.target.value);
          }, 500);
        }}
      />
    </div>
  );
};

export default Header;
