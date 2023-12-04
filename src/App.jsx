
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from './pages/Home/Home';
import CartPage from './pages/CartPage/CartPage';
import AdminPanel from './pages/AdminPanel/AdminPanel';
import './App.css';
import ProductDetails from './pages/ProductDetails/ProductDetails';

function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/productos/:id" element={<ProductDetails />} />
        <Route path="/cart-page/*" element={<CartPage />} />
        <Route path="/admin" element={<AdminPanel />} />
      </Routes>
      
    </Router>
    </>
  );
}

export default App;

