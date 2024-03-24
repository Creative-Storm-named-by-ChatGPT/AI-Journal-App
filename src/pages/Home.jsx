import { useState, useEffect } from "react";
import { JournalInput } from "../components/JournalInput";
import { collection, getDocs, doc, setDoc  } from "firebase/firestore";
import { Button ,Loading, Box, Image} from "@yamada-ui/react";
import { db, auth } from '../plugins/firebase'; // あなたのFirebase設定ファイルからインポート
import { addDoc, serverTimestamp, query, where, onSnapshot, limit, orderBy } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';

// import { docment,onSnapshot } from "firebase/firestore";
// import { collection, query, orderBy, limit, getDocs } from "firebase/firestore";

// async function fetchJournals(db) {
//   const journalsCol = collection(db, "journals");
//   const journalSnapshot = await getDocs(journalsCol);
//   const journalList = journalSnapshot.docs.map((doc) => doc.data());
//   return journalList;
// }
// const q = query(
//     collection(db, "yourCollectionID"),  // yourCollectionID は対象のコレクションIDに置き換える
//     orderBy("timestamp", "desc"), // timestamp はドキュメントのタイムスタンプが保存されているフィールドに置き換える
//     limit(1) // 最新の1つのドキュメントを取得する
//   );

//   const querySnapshot = await getDocs(q);
//   querySnapshot.forEach((document) => {
//       console.log("Latest document:", doc.id, "=>", doc.data());
//   });

export default function Home() {
  // 日記のデータを取得する
  const [journals, setJournals] = useState();

  const [inputValue, setInputValue] = useState("");

  const handleSave = async () => {
    console.log("入力された文字列です:", inputValue); //日記に入力された内容の中身をコンソールに表示
    try {
      const newId = uuidv4();
      console.log(newId);
      const docRef = await setDoc(doc(db, "journals", newId), {
        id: newId,
        uid: auth.currentUser.uid,
        timestamp: serverTimestamp(),
        content: inputValue,
        prompt: '',
        imageURL: '',
      });
      // console.log("Document written with ID: ", docRef.id);
      setInputValue(''); // 入力フィールドをクリア
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  useEffect(() => {
    const q = query(collection(db, "journals"), where("uid", "==", auth.currentUser.uid), limit(1), orderBy('timestamp', 'desc'),);
const unsubscribe = onSnapshot(q, (querySnapshot) => {
  const database_data = [];
  querySnapshot.forEach((doc) => {
      database_data.push(doc.data());
  });

  if (database_data[0]) {

    setJournals(database_data[0])
  } else {
    setJournals();
  }
});

console.log(journals)

  }, [])

  return (
    <>
      {(journals && !journals.imageURL) && (
          <Loading variant="grid" size="3xl" color="orange.500" />
      )}
      {(journals && journals.imageURL) && (
        <Box>
          <Image src={journals.imageURL} w='full' h='full' top={0} left={0} position='fixed' zIndex={1} borderRadius='md' shadow='md' filter='blur(24px)' />
          <Box w='full' h='100svh' z={10} position='fixed' display='flex' justifyContent='center' alignItems='center' top={0} left={0}>
            <Image src={journals.imageURL} w='sm' h='sm' borderRadius='3xl' shadow='md' />
          </Box>
        </Box>
      )}
      {!journals && (
        <div className="App">
        <JournalInput inputValue={inputValue} setInputValue={setInputValue} />
        <Button colorScheme="primary" variant="solid" onClick={handleSave}>
          画像を生成する
        </Button>
      </div>
      ) }
    </>
  )
}