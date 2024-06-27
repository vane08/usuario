import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Perfil from './components/usuario/Perfil';
import Navbar from './components/Navbar';

const App = () => {
  const userId = 3; // Define el userId según sea necesario

  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Perfil userId={userId} />} />
          {/* Puedes agregar más rutas aquí si es necesario */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
