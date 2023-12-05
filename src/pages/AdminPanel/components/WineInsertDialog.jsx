/* eslint-disable react/prop-types */
import '../Adminpanel.css';

const WineInsertDialog = ({ modalInsertar, form, isEditing, handleChange, postData, closeInsertModal }) => (
  modalInsertar && (
    <div className="modal">
      <span className="close" onClick={closeInsertModal}>
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
      <button className="button-cancel" onClick={closeInsertModal}>
        Cancelar
      </button>
    </div>
  )
);

export default WineInsertDialog;
