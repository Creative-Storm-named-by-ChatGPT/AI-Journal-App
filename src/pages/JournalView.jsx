import { useState, useEffect } from "react";
import { Header } from "../components/Header";
import "../App.css";
import { Button } from "@yamada-ui/react";
import { collection, getDocs } from "firebase/firestore";
import { JournalInput } from "../components/JournalInput";

function JournalView() {

  const [count, setCount] = useState(0);

  const [inputValue, setInputValue] = useState("");


  return (
    <div>
      <img src="" />
    </div>
  );
}

export default JournalView;
