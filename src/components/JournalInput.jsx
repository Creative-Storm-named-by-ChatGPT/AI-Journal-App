import React, { useState } from "react";
// import './Journalinput.css';
import { Textarea } from "@yamada-ui/react";
import { Input } from "@nextui-org/react";
import PropTypes from "prop-types"; // PropTypesをインポート

export function JournalInput({ inputValue, setInputValue }) {
  const handleInputChange = (event) => {
    const value = event.target.value;
    setInputValue(value); // 親コンポーネントで定義されたsetInputValueを呼び出してstateを更新
  };

  return (
    <div>
      <Textarea
        className="Journal_Input"
        variant="filled"
        resize="vertical"
        autosize
        minRows={10}
        placeholder="日記の内容を入力してください"
        value={inputValue}
        onChange={handleInputChange}
        textAlign={"left"}
      />
    </div>
  );
}

// propsのバリデーションを追加
JournalInput.propTypes = {
  inputValue: PropTypes.string.isRequired,
  setInputValue: PropTypes.func.isRequired,
};

export default JournalInput;