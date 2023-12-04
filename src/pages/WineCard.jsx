/* eslint-disable react/prop-types */
// WineCard.jsx


const WineCard = ({ wine, onEdit, onDelete }) => {
  const { ID, Nombre, Descripcion, Precio, Imagen } = wine;

  return (
    <div className="wine-card">
      <img src={Imagen} alt={Nombre} className="wine-image" />
      <div className="wine-details">
        <h3>{Nombre}</h3>
        <p>{Descripcion}</p>
        <p>Precio: ${parseFloat(Precio).toFixed(2)}</p>
        <div className="wine-actions">
          <button onClick={() => onEdit(ID)}>Editar</button>
          <button onClick={() => onDelete(ID)}>Eliminar</button>
        </div>
      </div>
    </div>
  );
};

export default WineCard;
