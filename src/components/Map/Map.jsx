
import './Map.css';

const Map = () => {
  return (
    <div className="map">
    <h2>Nuestra Ubicación</h2>
    {/* Agregar el código de inserción del mapa de Google de una ubicación real más adelante */}
    <iframe
      title="Ubicación de la Bodega"
      width="600"
      height="450"
      frameBorder="0"
      style={{ border: 0 }}
      src="https://www.google.com/maps/embed?your-map-embed-code"
      allowFullScreen
    ></iframe>
  </div>
  );
};

export default Map;
