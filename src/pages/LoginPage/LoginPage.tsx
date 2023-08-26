import React, { useRef, useContext } from "react";
import "./loginPage.scss";
import { Space, Button, Input, InputRef } from "antd";
import { characterService } from "../../modules/characters/characters.service";
import { CharacterContext } from "../../modules/characters/characters.context";

const LoginPage: React.FC = () => {
  const userRef = useRef<InputRef>(null)
  const passRef = useRef<InputRef>(null)

  const {setUserInfo} = useContext(CharacterContext)


  function loginUser(username:string | undefined, password:string | undefined){
    if (characterService.checkCredentials(username,password)) {setUserInfo(true)
    sessionStorage.setItem('userInfo', JSON.stringify(true))
    }
  }



  return (
    <div className="loginPage">
      <Space direction="vertical" size="large"
        onKeyDown={(e) => {
          if (e.key === "Enter") loginUser(userRef.current?.input?.value, passRef.current?.input?.value);
        }}>
        <Input
          size="large"
          placeholder="username"
          ref={userRef}
        />
        <Input.Password
          size="large"
          placeholder="password"
          ref={passRef}
        />
        <Button size="large" style={{ display: "block", margin: "0 auto" }}
        onClick={()=>loginUser(userRef.current?.input?.value, passRef.current?.input?.value)}
        >
          Log In
        </Button>
      </Space>
    </div>
  );
};

export default LoginPage;
