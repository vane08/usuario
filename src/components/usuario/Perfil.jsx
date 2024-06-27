import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import defaultPhoto from '../../assets/user.png'; // Importa la imagen de perfil por defecto
import confettiIcon from '../../assets/confetti.png'; // Importa el icono de confeti
import configIcon from '../../assets/config.png'; // Importa el icono de configuración
import '../../scss/base/_base.scss'; // Importa el archivo de estilos
import EditarPerfil from './EditarPerfil'; // Importa el componente de edición de perfil

const Perfil = ({ userId }) => {
  const [photo, setPhoto] = useState(null); // Estado para la foto de perfil
  const [usuario, setUsuario] = useState({}); // Estado para almacenar los datos del usuario
  const [showEditarPerfil, setShowEditarPerfil] = useState(false); // Estado para mostrar el componente de edición de perfil
  const [updateMessage, setUpdateMessage] = useState(''); // Estado para el mensaje de actualización

  // Efecto para cargar los datos del usuario desde la API al montar el componente
  useEffect(() => {
    const fetchUsuario = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/v1/usuarios/${userId}`);
        if (!response.ok) {
          throw new Error('Error al cargar los datos del usuario');
        }
        const data = await response.json();
        setUsuario(data); // Actualiza el estado con los datos del usuario obtenidos
      } catch (error) {
        console.error('Error:', error);
      }
    };
    fetchUsuario();
  }, [userId]); // Se ejecuta cuando userId cambia

  // Función para manejar el clic en el botón de configuración
  const handleConfiguracionClick = () => {
    setShowEditarPerfil(true); // Muestra el componente de edición de perfil
  };

  // Función para actualizar los datos del usuario después de editar
  const handleUpdateUsuario = (updatedUsuario) => {
    setUsuario(updatedUsuario); // Actualiza los datos del usuario en el estado
    setUpdateMessage('Perfil actualizado exitosamente'); // Establece el mensaje de actualización
    setTimeout(() => {
      setUpdateMessage(''); // Limpia el mensaje después de unos segundos
    }, 3000); // 3 segundos
    setShowEditarPerfil(false); // Oculta el componente de edición de perfil después de guardar
  };

  // Función para calcular la edad del usuario
  const calcularEdad = (fechaNacimiento) => {
    const today = new Date();
    const birthDate = new Date(fechaNacimiento);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  // Función para formatear la fecha de cumpleaños
  const formatDate = (fecha) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(fecha).toLocaleDateString('es-ES', options);
  };

  return (
    <div className="container text-center mt-5">
      {/* Contenedor para la imagen de perfil y los botones */}
      <div className="position-relative d-inline-block" style={{ width: '250px', height: '250px' }}>
        {/* Imagen de perfil */}
        <img
          src={photo || usuario.foto_perfil || defaultPhoto} // Muestra la foto seleccionada, la del usuario o la por defecto
          alt="Perfil"
          className="rounded-circle img-fluid"
          style={{ objectFit: 'cover', width: '100%', height: '100%' }}
        />
        {/* Botón para agregar o cambiar la foto */}
        <button
          className="btn bottom-color rounded-circle position-absolute bottom-0 end-0"
          style={{ width: '40px', height: '40px', lineHeight: '24px', textAlign: 'center' }}
          onClick={() => console.log('Implementar función para cambiar la foto')} // Implementar función para cambiar la foto
        >
          +
        </button>
        {/* Botón con icono de configuración */}
        <button
          className="btn rounded-circle position-absolute bottom-0 start-1"
          style={{ width: '40px', height: '40px', lineHeight: '24px', textAlign: 'center', background: 'none', border: 'none' }}
          onClick={handleConfiguracionClick} // Abre el componente de edición de perfil al hacer clic
        >
          <img src={configIcon} alt="Configuración" style={{ width: '20px' }} /> {/* Icono de configuración */}
        </button>
      </div>

      {/* Espacio para el nombre del usuario */}
      <div className="mt-3">
        <span className="text-color-camdev-titles" style={{ fontSize: '24px' }}>{`${usuario.nombre_usuario} ${usuario.ap1} ${usuario.ap2}`}</span> {/* Nombre completo del usuario */}
      </div>

      {/* Espacio para la fecha de nacimiento del usuario y su edad */}
      <div className="mt-2">
        <img src={confettiIcon} alt="Confeti" style={{ width: '24px', marginRight: '8px' }} /> {/* Icono de confeti */}
        <span className="text-muted" style={{ fontSize: '18px' }}>{`${usuario.fecha_nacimiento ? `${formatDate(usuario.fecha_nacimiento)} (${calcularEdad(usuario.fecha_nacimiento)} años)` : ''}`}</span> {/* Fecha de nacimiento y edad del usuario */}
      </div>

      {/* Mensaje de actualización */}
      {updateMessage && (
        <div className="alert alert-success mt-3" role="alert">
          {updateMessage}
        </div>
      )}

      {/* Componente de edición de perfil */}
      {showEditarPerfil && <EditarPerfil usuarioId={userId} handleUpdateUsuario={handleUpdateUsuario} />}
    </div>
  );
};

export default Perfil;
