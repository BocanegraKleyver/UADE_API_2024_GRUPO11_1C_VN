import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
    return (
        <nav className="bg-gray-800 text-white p-4 flex justify-between items-center fixed top-0 w-full z-10">
            <div>
                <Link to="/" className="text-xl font-bold">SillaShop © API 2024 Grupo 11</Link>
            </div>
            <div className="space-x-4">
                <Link to="/home" className="hover:text-gray-400">Home</Link>
                <Link to="/catalogo" className="hover:text-gray-400">Catalogo</Link>    
                <Link to="/administrar" className="hover:text-gray-400">Administrar</Link>
            </div>
        </nav>
    );
};

export default NavBar;
