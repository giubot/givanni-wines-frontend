/* eslint-disable react/prop-types */
import '../Adminpanel.css';

const WineTable = ({ data, selectWine, setModalEliminar }) => (
  <table className="wine-table">
    <thead>
      <tr>
        <th>ID </th>
        <th>Nombre</th>
        <th>Descripción</th>
        <th>Precio</th>
        <th>Imagen</th>
        <th>Acciones</th>
      </tr>
    </thead>
    <tbody>
      {data.map((wine) => (
        <tr key={wine.ID}>
          <td>{wine.ID}</td>
          <td>{wine.Nombre}</td>
          <td>{wine.Descripcion}</td>
          <td>{wine.Precio}</td>
          <td>
            <img src={wine.Imagen} alt={wine.Nombre} className="wine-image" />
          </td>
          <td>
            <button
              className="button-edit"
              onClick={() => {
                selectWine(wine);
              }}
            >
              Editar
            </button>
            <button
              className="button-delete"
              onClick={() => {
                selectWine(wine);
                setModalEliminar(true);
              }}
            >
              Eliminar
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default WineTable;
