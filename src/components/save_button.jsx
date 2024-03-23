import React, { useState } from 'react';
import { Button } from "@yamada-ui/react";

export function SaveButton() {
    const [inputValue, setInputValue] = useState(""); // 入力された値を保持するstate

    const handleSave = () => {
        console.log("入力された文字列:", inputValue);
    };

    return (
        <div>
           
        </div>
    );
}

export default SaveButton;
