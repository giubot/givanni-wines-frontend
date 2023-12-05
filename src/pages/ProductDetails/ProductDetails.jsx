
import  { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar/Nabvar';
import Footer from '../../components/Footer/Footer';
import './ProductDetails.css';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [productDetails, setProductDetails] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await fetch(`http://localhost:3000/productos/${id}`);
        const data = await response.json();
        setProductDetails(data);
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    fetchProductDetails();
  }, [id]);

  const addToCart = () => {
    const updatedCart = [...cart, productDetails];
    setCart(updatedCart);
    // Navega ción a CartPage y pasa el estado del carrito actualizado como  prop
    navigate('/cart-page', { state: { cart: updatedCart } });
  };

  if (!productDetails) {
    return <p>Cargando detalles del producto...</p>;
  }

  return (
    <>  <Navbar />
    <div className='product-details-page'>
      <div className="product-details-container">
        <div className="product-image">
          <img src={productDetails.Imagen} alt={productDetails.Nombre} />
        </div>
        <div className="product-info">
          <h2>{productDetails.Nombre}</h2>
          <p className="price">Precio: ${productDetails.Precio}</p>
          <p className="description">Descripción: {productDetails.Descripcion}</p>
          <button className="add-to-cart-button" onClick={addToCart}>
            Añadir a la compra
          </button>
        </div>
      </div>
      
      </div>
      <Footer />
    </>
  );
};

export default ProductDetails;

