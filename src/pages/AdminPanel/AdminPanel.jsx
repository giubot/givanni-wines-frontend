import  { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminPanel.css';
import Navbar from '../../components/Navbar/Nabvar';
import Footer from '../../components/Footer/Footer';
import WineTable from './components/WineTable';
import WineInsertDialog from './components/WineInsertDialog';
import WineDeleteDialog from './components/WineDeleteDialog';

const apiUrl = "http://localhost:3000/productos";

const AdminPanelPage = () => {
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
      if (!validateForm()) return;

      const dataToSend = buildDataToSend();

      if (isEditing) {
        await axios.put(`${apiUrl}/${form.ID}`, dataToSend);
      } else {
        await axios.post(apiUrl, dataToSend);
      }

      closeInsertModal();
      fetchData();
    } catch (error) {
      console.error('Error:', error.message);
      // Mostrar un mensaje de error al usuario
    }
  };

  const validateForm = () => {
    if (!form.Nombre || !form.Descripcion || !form.Precio || !form.Imagen) {
      console.error('Error: Missing or invalid fields in the form')
      alert('Debes completar todos los campos antes de enviar');
      return false;
    }

    return true;
  };

  const buildDataToSend = () => {
    if (isNaN(form.Precio)) {
      alert('Por favor, ingresa solo números en el campo de precio');
      return null; 
    }
  
    const precioNumerico = parseFloat(form.Precio);
  
    return {
      Nombre: form.Nombre,
      Descripcion: form.Descripcion,
      Precio: precioNumerico,
      Imagen: form.Imagen,
    };
  }; 

  const deleteData = async () => {
    try {
      if (!validateID()) return;

      await axios.delete(`${apiUrl}/${form.ID}`);
      closeDeleteModal();
      fetchData();
    } catch (error) {
      console.error('Error deleting wine:', error.message);
    }
  };

  const validateID = () => {
    if (isNaN(form.ID) || form.ID === null || form.ID === undefined) {
      console.error('Error deleting wine: Invalid wine ID', form.ID);
      return false;
    }

    return true;
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
    const wineId = wine.ID || generateTempID();

    setForm((prevForm) => ({
      ...prevForm,
      ID: wineId,
      Nombre: wine.Nombre,
      Descripcion: wine.Descripcion,
      Precio: wine.Precio.toString(),
      Imagen: wine.Imagen,
    }));

    setIsEditing(true);

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

  const closeInsertModal = () => {
    setModalInsertar(false);
  };

  const closeDeleteModal = () => {
    setModalEliminar(false);
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

      <WineTable data={data} selectWine={selectWine} setModalEliminar={setModalEliminar} />
      <WineInsertDialog
        modalInsertar={modalInsertar}
        form={form}
        isEditing={isEditing}
        handleChange={handleChange}
        postData={postData}
        closeInsertModal={closeInsertModal}
      />
      <WineDeleteDialog
        modalEliminar={modalEliminar}
        form={form}
        deleteData={deleteData}
        closeDeleteModal={closeDeleteModal}
      />

      <Footer />
    </div>
  );
};

export default AdminPanelPage;
