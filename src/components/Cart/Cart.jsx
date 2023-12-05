/* Siguiente función en la que tenemos que trabajar, componente incompleto*/

/* desabilitar las proptypes de eslint hasta que las pueda crear */

import { useLocation } from 'react-router-dom';
import './Cart.css';

const Cart = () => {
  
  const location = useLocation();
  const cartItems = location.state?.cart || []; // Accede a los productos 

  return (
    <div className="cart-container">
      <h2>Carrito de Compras</h2>
      
      {cartItems.map((item, index) => (
        <div key={index} className="cart-item">
          <p>{item.Nombre}</p>
          <p>Precio: ${item.Precio}</p>
          {/* En el futuro  DEbería mostrar cards de productos seleccionados, cantidades, precios, 
      un botón de incremento y decremento y  agregar una función que sume el total  */}
        </div>
      ))}
      <button>Comprar</button>
    </div>
  );
};

export default Cart;