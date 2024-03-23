import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Header from './components/Header'; // ヘッダーコンポーネントのパスを正しく指定する
import './index.css';
import { UIProvider } from '@yamada-ui/react';
import JournalInput from './components/JournalInput';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <UIProvider>
        <Header />
        <App />
      </UIProvider>
  </React.StrictMode>
);