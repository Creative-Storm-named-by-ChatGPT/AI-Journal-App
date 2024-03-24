import { initializeApp } from "firebase/app";
import { getAuth, GithubAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyALFiIroFy8vWc_Oqr83Ur_PlMujF6_WzM",
  authDomain: "hackson-69a0a.firebaseapp.com",
  projectId: "hackson-69a0a",
  storageBucket: "hackson-69a0a.appspot.com",
  messagingSenderId: "300845554218",
  appId: "1:300845554218:web:ecc5555cdfd2dd01f1c153",
  measurementId: "G-V5H99G2X1G"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GithubAuthProvider();
provider.addScope('repo');
export default app;
export {db, provider, auth}