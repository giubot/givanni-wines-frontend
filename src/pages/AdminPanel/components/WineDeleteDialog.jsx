/* eslint-disable react/prop-types */
import '../Adminpanel.css';

const WineDeleteDialog = ({ modalEliminar, form, deleteData, closeDeleteModal }) => (
  modalEliminar && (
    <div className="modal">
      <div>¿Estás seguro de que deseas eliminar el vino {form && form.Nombre} ?</div>
      <button className="button-confirm" onClick={deleteData}>
        Sí
      </button>
      <button className="button-cancel" onClick={closeDeleteModal}>
        No
      </button>
    </div>
  )
);

export default WineDeleteDialog;
