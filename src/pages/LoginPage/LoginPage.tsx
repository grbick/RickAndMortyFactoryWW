import React, { useRef, useContext } from "react";
import "./loginPage.scss";
import { Space, Button, Input, InputRef } from "antd";
import { characterService } from "../../modules/characters/characters.service";
import { CharacterContext } from "../../modules/characters/characters.context";

const LoginPage: React.FC = () => {
  // usual practice is to bind state instead of using useRef
  // use useRef when state binding doesnt solve your problem
  const userRef = useRef<InputRef>(null)
  const passRef = useRef<InputRef>(null)

  const {setUserInfo} = useContext(CharacterContext)


  // do you need to pass props or can you just use refs directly?
  function loginUser(username:string | undefined, password:string | undefined){
    
    if (characterService.checkCredentials(username,password)) {
      // watch out for identation
      setUserInfo(true)
      sessionStorage.setItem('userInfo', JSON.stringify(true))
    }
  }

  // better to have as little of code possible in html part of TSX, unless its some specific case
  // instead place it all in component typescript body and then reference the function in html
  const handleKeyDown = (event:  React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter") loginUser(userRef.current?.input?.value, passRef.current?.input?.value);
  }



  return (
    <div className="loginPage">
      <Space direction="vertical" size="large"
        onKeyDown={handleKeyDown}>
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
