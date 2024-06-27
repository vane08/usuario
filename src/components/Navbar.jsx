import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';  // Asegúrate de importar Bootstrap JS y Popper.js

const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark color_nav">
            <div className="container-fluid">
                <a className="navbar-brand" href="#"><h3 className='mt-2'>camdev</h3></a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a className="nav-link" aria-current="page" href="#">Inicio</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Acerca de</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Servicios</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link active" href="#">Mi perfil</a>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Más
                            </a>
                            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <li><a className="dropdown-item" href="#">Opción 1</a></li>
                                <li><a className="dropdown-item" href="#">Opción 2</a></li>
                                <li><hr className="dropdown-divider" /></li>
                                <li><a className="dropdown-item" href="#">Opción 3</a></li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;