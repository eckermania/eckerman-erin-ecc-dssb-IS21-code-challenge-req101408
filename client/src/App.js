import { Routes, Route } from 'react-router-dom';
import './App.css';

import Products from "./components/products"

function App() {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Products />} />
            </Routes>
        </div>
    );
}

export default App;
