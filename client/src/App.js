import { Routes, Route } from 'react-router-dom';
import './App.css';

import Products from "./components/products"
import ProductCreateForm from "./components/forms/product_create"

function App() {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Products />} />
                <Route path="/product/new" element={<ProductCreateForm />} />
            </Routes>
        </div>
    );
}

export default App;
