import React, { useState, useEffect } from 'react';
import eliminarIcon from '../../assets/eliminar.png'; // Importa el icono de eliminar perfil
import passwordIcon from '../../assets/password.png'; // Importa el icono de cambiar contraseña

const EditarPerfil = ({ usuarioId, handleUpdateUsuario }) => {
  const [editUsuario, setEditUsuario] = useState({}); // Estado para los datos editados del usuario
  const [isLoading, setIsLoading] = useState(false); // Estado para manejar la carga

  // Función para cargar los datos del usuario desde la API al montar el componente
  useEffect(() => {
    const fetchUsuario = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/v1/usuarios/${usuarioId}`);
        if (!response.ok) {
          throw new Error('Error al cargar los datos del usuario');
        }
        const data = await response.json();

        // Formatear la fecha de nacimiento para que sea aceptable por el input de tipo date
        if (data.fecha_nacimiento) {
          data.fecha_nacimiento = data.fecha_nacimiento.split('T')[0];
        }

        setEditUsuario(data); // Actualiza el estado con los datos del usuario obtenidos
        console.log('Usuario obtenido:', data); // Imprime el JSON del usuario en la consola
      } catch (error) {
        console.error('Error:', error);
      }
    };
    fetchUsuario();
  }, [usuarioId]); // Se ejecuta cuando usuarioId cambia

  // Función para manejar cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditUsuario({ ...editUsuario, [name]: value });
  };

  // Función para guardar los cambios
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Activa el estado de carga

    try {
      const { nombre_usuario, ap1, ap2, correo_electronico, fecha_nacimiento } = editUsuario;

      const patchData = {
        nombre_usuario,
        ap1,
        ap2,
        correo_electronico,
        fecha_nacimiento
      };

      console.log('JSON enviado en PATCH:', patchData); // Imprime el JSON que se enviará en la consola

      const response = await fetch(`http://localhost:3000/api/v1/usuarios/${usuarioId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(patchData),
      });

      if (!response.ok) {
        throw new Error('Error al actualizar el perfil');
      }

      handleUpdateUsuario(editUsuario); // Actualiza el estado del usuario en el componente principal
    } catch (error) {
      console.error('Error:', error);
      alert('Ocurrió un error al actualizar el perfil');

      // Si no se logra conectar con la API, imprimir el JSON que se intentó enviar
      console.log('Intento de JSON enviado en PATCH:', patchData);
    } finally {
      setIsLoading(false); // Desactiva el estado de carga
    }
  };

  // Función para manejar el clic en el botón de cambiar contraseña
  const handleChangePassword = () => {
    console.log('Implementar función para cambiar la contraseña');
    // Aquí puedes redirigir a una página de cambio de contraseña o mostrar un modal para cambiar la contraseña
  };

  // Función para manejar el clic en el botón de eliminar perfil
  const handleDeleteProfile = async () => {
    if (window.confirm('¿Estás seguro de que deseas eliminar tu perfil? Esta acción no se puede deshacer.')) {
      try {
        const response = await fetch(`http://localhost:3000/api/v1/usuarios/${usuarioId}`, {
          method: 'DELETE',
        });
        if (!response.ok) {
          throw new Error('Error al eliminar el perfil');
        }
        alert('Perfil eliminado exitosamente');
        // Aquí puedes redirigir al usuario a una página de inicio de sesión o a otra página adecuada
      } catch (error) {
        console.error('Error:', error);
        alert('Ocurrió un error al eliminar el perfil');
      }
    }
  };

  return (
    <div className="container text-center mt-5">
      <h2>Editar Perfil</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="nombreUsuario" className="form-label">Nombre de Usuario</label>
          <input type="text" className="form-control" id="nombreUsuario" name="nombre_usuario" value={editUsuario.nombre_usuario || ''} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="ap1" className="form-label">Primer Apellido</label>
          <input type="text" className="form-control" id="ap1" name="ap1" value={editUsuario.ap1 || ''} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="ap2" className="form-label">Segundo Apellido</label>
          <input type="text" className="form-control" id="ap2" name="ap2" value={editUsuario.ap2 || ''} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="correoElectronico" className="form-label">Correo Electrónico</label>
          <input type="email" className="form-control" id="correoElectronico" name="correo_electronico" value={editUsuario.correo_electronico || ''} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="fechaNacimiento" className="form-label">Fecha de Nacimiento</label>
          <input type="date" className="form-control" id="fechaNacimiento" name="fecha_nacimiento" value={editUsuario.fecha_nacimiento || ''} onChange={handleChange} />
        </div>
        {/* Añadir más campos según sea necesario, excluyendo la contraseña */}
        <div className="d-flex justify-content-center gap-3">
          <button type="submit" className="btn btn-primary" disabled={isLoading}>Guardar Cambios</button>
          <button type="button" onClick={handleChangePassword}>
            <img src={passwordIcon} alt="Cambiar Contraseña" style={{ width: '40px' }} />
          </button>
          <button type="button" onClick={handleDeleteProfile}>
            <img src={eliminarIcon} alt="Eliminar Perfil" style={{ width: '40px' }} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditarPerfil;
