/* eslint-disable react/prop-types */
// 
import { useLocation } from 'react-router-dom';
import './Cart.css';

const Cart = () => {
  // Usa useLocation para acceder a la ubicación y su estado
  const location = useLocation();
  const cartItems = location.state?.cart || []; // Accede a los productos seleccionados

  return (
    <div className="cart-container">
      <h2>Carrito de Compras</h2>
      {/* Muestra productos seleccionados, cantidades, precios, etc. */}
      {cartItems.map((item, index) => (
        <div key={index} className="cart-item">
          <p>{item.Nombre}</p>
          <p>Precio: ${item.Precio}</p>
          {/* Aquí puedes agregar más detalles según tus necesidades */}
        </div>
      ))}
      <button>Comprar</button>
    </div>
  );
};

export default Cart;