import { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminPanel.css';
import Navbar from '../../components/Navbar/Nabvar';
import Footer from '../../components/Footer/Footer';

const apiUrl = "http://localhost:3000/productos";

const AdminPanel = () => {
  const [data, setData] = useState([]);
  const [modalInsertar, setModalInsertar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [form, setForm] = useState({
    ID: null,
    Nombre: '',
    Descripcion: '',
    Precio: '',
    Imagen: '',
  });
  const [isEditing, setIsEditing] = useState(false);

  const fetchData = async () => {
    try {
      const response = await axios.get(apiUrl);
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error.message);
    }
  };

  const postData = async () => {
    try {
      // Verificar que los valores necesarios no sean nulos o indefinidos
      if (!form.Nombre || !form.Descripcion || !form.Precio || !form.Imagen) {
        console.error('Error: Missing or invalid fields in the form');
        return;
      }

      // Verificar si el Precio ya es numérico
      const precioNumerico = !isNaN(form.Precio) ? parseFloat(form.Precio) : form.Precio;

      // Construir un nuevo objeto para la solicitud POST o PUT según estemos editando o creando
      const dataToSend = {
        Nombre: form.Nombre,
        Descripcion: form.Descripcion,
        Precio: precioNumerico,
        Imagen: form.Imagen,
      };

      if (isEditing) {
        // Si estamos en modo de edición, hacemos una solicitud PUT
        await axios.put(`${apiUrl}/${form.ID}`, dataToSend);
      } else {
        // Si no estamos en modo de edición, hacemos una solicitud POST
        await axios.post(apiUrl, dataToSend);
      }

      setModalInsertar(false);
      fetchData();
    } catch (error) {
      console.error('Error:', error.message);
      // Mostrar un mensaje de error al usuario
      // Puedes utilizar un estado para gestionar mensajes de error en tu interfaz
    }
  };

  const deleteData = async () => {
    try {
      console.log('Deleting wine with ID:', form.ID);
  
      // Verificar si form.ID es un valor numérico antes de intentar la eliminación
      if (isNaN(form.ID) || form.ID === null || form.ID === undefined) {
        console.error('Error deleting wine: Invalid wine ID', form.ID);
        return;
      }
  
      await axios.delete(`${apiUrl}/${form.ID}`);
      setModalEliminar(false);
      fetchData();
    } catch (error) {
      console.error('Error deleting wine:', error.message);
    }
  };

  const toggleInsertModal = () => {
    setForm({
      ID: null,
      Nombre: '',
      Descripcion: '',
      Precio: '',
      Imagen: '',
    });
    setIsEditing(false);
    setModalInsertar(!modalInsertar);
  };

  const selectWine = (wine) => {
    const wineId = wine.ID || generateTempID(); // Asigna un ID temporal si no hay un ID definido
  
    console.log('Selected wine with ID:', wineId);
  
    // Actualiza primero el estado y luego abre el modal
    setForm((prevForm) => ({
      ...prevForm,
      ID: wineId,
      Nombre: wine.Nombre,
      Descripcion: wine.Descripcion,
      Precio: wine.Precio.toString(),
      Imagen: wine.Imagen,
    }));
  
    setIsEditing(true);
  
    // Espera un breve momento para que los estados se actualicen y luego abre el modal
    setTimeout(() => {
      setModalInsertar(true);
    }, 0);
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const generateTempID = () => {
    return `temp_${Date.now()}`;
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="WineApp">
      <Navbar />
      <br />
      <br />

      <button
        className="button-add"
        onClick={() => {
          toggleInsertModal();
        }}
      >
        + Agregar Producto
      </button>
      <br />
      <br />
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

      {/* Insertar diálogo */}
      {modalInsertar && (
  <div className="modal">
    <span className="close" onClick={toggleInsertModal}>
      x
    </span>
    <div className="form-group">
      
      
      <br />
      <label htmlFor="Nombre">Nombre</label>
      <input
        type="text"
        id="Nombre"
        name="Nombre"
        onChange={handleChange}
        value={form.Nombre || ''}
      />
      <br />
      <label htmlFor="Descripcion">Descripción</label>
      <input
        type="text"
        id="Descripcion"
        name="Descripcion"
        onChange={handleChange}
        value={form.Descripcion || ''}
      />
      <br />
      <label htmlFor="Precio">Precio</label>
      <input
        type="text"
        id="Precio"
        name="Precio"
        onChange={handleChange}
        value={form.Precio || ''}
      />
      <br />
      <label htmlFor="Imagen">Imagen URL</label>
      <input
        type="text"
        id="Imagen"
        name="Imagen"
        onChange={handleChange}
        value={form.Imagen || ''}
      />
    </div>
    <button className="button-insert" onClick={postData}>
      {isEditing ? 'Editar' : 'Insertar'}
    </button>
    <button className="button-cancel" onClick={toggleInsertModal}>
      Cancelar
    </button>
  </div>
)}

{/* Eliminar diálogo */}
{modalEliminar && (
  <div className="modal">
    <div>¿Estás seguro de que deseas eliminar el vino {form && form.Nombre} ?</div>
    <button className="button-confirm" onClick={deleteData}>
      Sí
    </button>
    <button className="button-cancel" onClick={() => setModalEliminar(false)}>
      No
    </button>
  </div>
)}

      <Footer />
    </div>
  );
};

export default AdminPanel;
