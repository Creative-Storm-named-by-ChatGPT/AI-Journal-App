import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import { Header } from "./components/Header";
import "./App.css";
import { Button, Loading, Center } from "@yamada-ui/react";
import {  Routes, Route } from "react-router-dom";
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import { onAuthStateChanged } from 'firebase/auth';
import {auth} from './plugins/firebase.js'


function App() {
  const [loginState, setLoginState] = useState(0);

  useEffect(() => {
      onAuthStateChanged(auth, (user) => {
          if (user) {
              setLoginState(1);
          } else {
              setLoginState(2);
          }
      });
  }, []);

  // ローディング
  if (loginState == 0) {
    return (
      <Center w='100%' height='100svh'>
        <Loading variant="rings" size="3xl" color="blue.500" />
      </Center>
    )
  }

  // ログイン画面
  if (loginState == 2) {
    return (
      <Login />
    )
  }

  // 許可
  return (
      <div className="App">
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
        </Routes>
      </div>
  );
}

export default App;

/*
データベースメモ


/journals/*
に日記があります

journalsのアイテム

https://www.npmjs.com/package/uuid



{
  'id': 'string<アイテムのID uuid>',
  'uid': 'string<ユーザーのID, Firebase AuthのIDを入れてください>',
  'timestamp': 'timestamp<>設定する時は、servertimestamp()でやってください。',
  'content': 'string<日記の内容>',
  'prompt': 'string<バックエンとで設定するので空の文字列を入れてください。>',
  'imageURL': 'string<バックエンとで設定するので空の文字列を入れてください。>',
}


*/