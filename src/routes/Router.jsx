import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home } from '../pages/Home';

export const Router = () => {
    return (
        <BrowserRouter>
        <Routes>
            <Route exact path="/" component={Home} />
        </Routes>
        </BrowserRouter>
    );
};