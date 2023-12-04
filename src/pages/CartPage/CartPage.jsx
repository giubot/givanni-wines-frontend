import './CartPage.css';

import Navbar from "../../components/Navbar/Nabvar";
'react-router-dom';
import Cart from '../../components/Cart/Cart';
import Footer from '../../components/Footer/Footer';

const CartPage = () => {
  return (
    <>
    <div className='body'>
      <Navbar />
      <div className="cart-container">
        <Cart />
      </div>
      <Footer />
      </div>
    </>
  );
};

export default CartPage;