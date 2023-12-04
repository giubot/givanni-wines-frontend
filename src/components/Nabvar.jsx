import './Navbar.css';

import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav>
      <div className="logo">
        <Link to="/">Bodega Givanni</Link>
      </div>
      <div className="cart-link">
        <Link to="/cart">Carrito</Link>
      </div>
    </nav>
  );
};

export default Navbar;