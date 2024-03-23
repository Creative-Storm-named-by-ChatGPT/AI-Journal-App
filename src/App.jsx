import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { Header } from "./components/Header";
import "./App.css";
import { Button } from "@yamada-ui/react";
import { collection, getDocs } from "firebase/firestore";
import { JournalInput } from "./components/JournalInput";
import { SaveButton } from "./components/save_button";

/* 
データベースメモ


/journals/*
に日記があります

journalsのアイテム

{
  'id': 'string<アイテムのID uuid>',
  'uid': 'string<ユーザーのID, Firebase AuthのIDを入れてください>',
  'timestamp': 'timestamp<>設定する時は、servertimestamp()でやってください。',
  'content': 'string<日記の内容>',
  'prompt': 'string<バックエンとで設定するので空の文字列を入れてください。>',
  'imageURL': 'string<バックエンとで設定するので空の文字列を入れてください。>',
}


*/
async function fetchJournals(db) {
  const journalsCol = collection(db, "journals");
  const journalSnapshot = await getDocs(journalsCol);
  const journalList = journalSnapshot.docs.map((doc) => doc.data());
  return journalList;
}

function App() {
  // 日記のデータを取得する
  const [journals, setJournals] = useState([]);

  useEffect(() => {
    async function getJournals() {
      const journalsFromFirestore = await fetchJournals(collection);
      setJournals(journalsFromFirestore);
    }

    getJournals();
  }, []);
  // ここまで

  const [count, setCount] = useState(0);

  const [inputValue, setInputValue] = useState("");

  const handleSave = () => {
    console.log("入力された文字列です:", inputValue); //日記に入力された内容の中身をコンソールに表示
  };

  const handleClick = () => {
    setCount(count + 1);
  };

  return (
    <div className="App">
      <Header />
      <p>You clicked {count} times</p>
      <Button primary onClick={handleClick}>
        Click me
      </Button>
      <div>
        {journals.map((journal, index) => (
          <div key={index}>
            <p>{journal.content}</p>
            {/* 他の日記情報もここで表示 */}
          </div>
        ))}
      </div>
      <div className="App">
        <JournalInput inputValue={inputValue} setInputValue={setInputValue} />
        <button onClick={handleSave}>保存</button>
      </div>
    </div>
  );
}

export default App;
