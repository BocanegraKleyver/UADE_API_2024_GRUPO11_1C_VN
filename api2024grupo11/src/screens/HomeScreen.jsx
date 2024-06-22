import React from 'react';
import { Link } from 'react-router-dom';
import { useUsuarioContext } from '../context/UsuarioContext';

const HomeScreen = () => {
    const { usuarioAutenticado } = useUsuarioContext();

    
    const esAdministrador = usuarioAutenticado && usuarioAutenticado.administrador;

    
    const productos = [
        { id: 1, nombre: 'Silla Gamer', imagen: '/img/silla-gamer.jpg' },
        { id: 2, nombre: 'Silla Ejecutiva', imagen: '/img/silla-ejecutiva.jpg' },
        { id: 3, nombre: 'Silla de Comedor', imagen: '/img/silla-comedor.jpg' },
        
    ];

    
    const obtenerImagenAleatoria = () => {
        const productoAleatorio = productos[Math.floor(Math.random() * productos.length)];
        return productoAleatorio.imagen;
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h2 className="text-2xl font-bold mb-4">Bienvenido al HomeScreen</h2>

            <nav className="space-x-4 mb-4">
                <Link to="/dashboard" className="text-blue-500 underline">Dashboard</Link>
                <Link to="/profile" className="text-blue-500 underline">Perfil</Link>
                {esAdministrador && (
                    <Link to="/administrar" className="text-blue-500 underline">Administrar</Link>
                )}
                <Link to="/carrito" className="text-blue-500 underline">Carrito</Link>
            </nav>

            <div className="grid grid-cols-3 gap-4">
                {productos.map((producto) => (
                    <div key={producto.id} className="bg-white p-4 rounded-md shadow-md">
                        <img src={producto.imagen} alt={producto.nombre} className="w-full h-auto mb-2" />
                        <p className="text-center font-semibold">{producto.nombre}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HomeScreen;
