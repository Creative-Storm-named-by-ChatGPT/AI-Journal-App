import { Heading, Text, Button ,Image } from "@yamada-ui/react"
import { signInWithPopup } from "firebase/auth";
import {auth, provider } from '../plugins/firebase.js';
import { FaGithub } from "react-icons/fa";
import "./Login.css";

export default function Login() {
    function onHandleClick() {
        signInWithPopup(auth, provider);
    }

    return (
        <div className="login-container">
                <Heading textAlign='center' className="login-text">AI Journal App</Heading>
                <Text>AI Journal Appにログイン。</Text>
                <Button size="lg" mt='sm' colorScheme="primary" variant="solid" display='flex' alignItems='center' onClick={onHandleClick}mx='auto'>
                    <FaGithub />
                    Githubでログイン
                </Button>
        </div>
    )
}