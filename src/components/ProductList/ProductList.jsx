import  { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './ProductList.css';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [searchModalVisible, setSearchModalVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/productos')
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error('Error fetching productos:', error));
  }, []);

  const handleSearchClick = () => {
    setSearchModalVisible(true);
    // Realiza la búsqueda cuando se abre el modal, o puedes realizar la búsqueda al hacer clic en un botón dentro del modal
    // En este ejemplo, realiza la búsqueda aquí al abrir el modal
    performSearch();
  };

  const performSearch = () => {
    if (!searchTerm) {
      setSearchResults([]);
      return;
    }

    fetch(`http://localhost:3000/productos/buscar/${searchTerm}`)
      .then(response => response.json())
      .then(data => setSearchResults(data))
      .catch(error => console.error('Error fetching search results:', error));
  };

  const handleCloseModal = () => {
    setSearchModalVisible(false);
  };

  return (
    <div className="product-list-container">
      <h2 className="product-list-title">Nuestra Selección</h2>
      
      {/* Agrega el botón de búsqueda */}
      <div className="search-button" onClick={handleSearchClick}>
        <span role="img" aria-label="Search">🔍</span> Buscar
      </div>

      <ul className="product-list-ul">
        {products.map(product => (
          <li key={product.ID} className="product-list-item">
            <Link to={`/productos/${product.ID}`}>
              <img className="product-list-image" src={product.Imagen} alt={product.Nombre} />
              <div className="product-list-details">
                <p className="product-list-name">{product.Nombre}</p>
                <p className="product-list-description">{product.Descripcion}</p>
                <p className="product-list-price">${parseFloat(product.Precio).toFixed(2)}</p>
                {/* Agregar botón para agregar al carrito */}
              </div>
            </Link>
          </li>
        ))}
      </ul>

      {/* Agrega el modal de búsqueda */}
      {searchModalVisible && (
        <div className="search-modal">
          {/* Agrega el botón de cierre (x) */}
          <button className="close-button" onClick={handleCloseModal}>
            <span role="img" aria-label="Close">X</span>
          </button>

          <div className='search-modal-title'>Busca el vino que deseas por su nombre:</div>
          <input
            className='search-modal-input'
            type="text"
            id="searchInput"
            placeholder="Nombre del vino"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            
          />

          <button className='search-wine-button' onClick={performSearch}>Buscar</button>
          <ul>
            {searchResults.map(result => (
              <Link to={`/productos/${result.ID}`} key={result.ID} className='eliminate-link'>
                {/* Wrap each result with Link */}
                <li>
                  <div className="search-result-card">
                    <img
                      className="search-result-image"
                      src={result.Imagen}
                      alt={result.Nombre}
                    />
                    <div className="search-result-details">
                      <p className="search-result-name">{result.Nombre}</p>
                      <p className="search-result-description">{result.Descripcion}</p>
                      <p className="search-result-price">${parseFloat(result.Precio).toFixed(2)}</p>
                    </div>
                  </div>
                </li>
              </Link>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ProductList;
