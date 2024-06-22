import React, { useState, useEffect } from 'react';
import { useRolContext } from '../context/RolContext';
import { Link } from 'react-router-dom';

const RolScreen = () => {
    const { roles, loadRoles, createRol, updateRol, deleteRol } = useRolContext();
    const [descripcionRol, setDescripcionRol] = useState('');
    const [rolSeleccionado, setRolSeleccionado] = useState(null);

    useEffect(() => {
        loadRoles();
    }, [loadRoles]);

    const handleCreateRol = async () => {
        try {
            await createRol({ descripcion: descripcionRol });
            setDescripcionRol('');
            loadRoles();
        } catch (error) {
            console.error('Error al crear el rol:', error);
        }
    };

    const handleUpdateRol = async () => {
        try {
            if (!rolSeleccionado) return;
    
            await updateRol(rolSeleccionado.id, { descripcion: rolSeleccionado.descripcion });
            setRolSeleccionado(null);
            loadRoles();
        } catch (error) {
            console.error('Error al actualizar el rol:', error);
        }
    };

    const handleDeleteRol = async (id) => {
        try {
            await deleteRol(id);
        } catch (error) {
            console.error('Error al eliminar el rol:', error);
        }
    };

    const handleSelectRol = (rol) => {
        setRolSeleccionado(rol);
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h2 className="text-2xl font-bold mb-4">Roles</h2>

            <ul className="space-y-4 mb-8">
                {roles.map((rol) => (
                    <li key={rol.id} className="flex items-center justify-between p-4 bg-white shadow-md rounded-md">
                        <span className="text-lg font-semibold">{rol.descripcion}</span>
                        <div className="space-x-2">
                            <button
                                className="px-4 py-2 bg-blue-500 text-white rounded-md"
                                onClick={() => handleSelectRol(rol)}
                            >
                                Editar
                            </button>
                            <button
                                className="px-4 py-2 bg-red-500 text-white rounded-md"
                                onClick={() => handleDeleteRol(rol.id)}
                            >
                                Eliminar
                            </button>
                        </div>
                    </li>
                ))}
            </ul>

            <div className="mb-8">
                <h3 className="text-xl font-semibold mb-2">Crear Nuevo Rol</h3>
                <div className="flex space-x-2 mb-4">
                    <input
                        type="text"
                        placeholder="Descripción del rol"
                        className="p-2 border border-gray-300 rounded-md flex-1"
                        value={descripcionRol}
                        onChange={(e) => setDescripcionRol(e.target.value)}
                    />
                    <button
                        className="px-4 py-2 bg-green-500 text-white rounded-md"
                        onClick={handleCreateRol}
                    >
                        Crear
                    </button>
                </div>
            </div>

            {rolSeleccionado && (
                <div>
                    <h3 className="text-xl font-semibold mb-2">Editar Rol</h3>
                    <div className="flex space-x-2 mb-4">
                        <input
                            type="text"
                            placeholder="Descripción del rol"
                            className="p-2 border border-gray-300 rounded-md flex-1"
                            value={rolSeleccionado.descripcion}
                            onChange={(e) => setRolSeleccionado({ ...rolSeleccionado, descripcion: e.target.value })}
                        />
                        <button
                            className="px-4 py-2 bg-yellow-500 text-white rounded-md"
                            onClick={handleUpdateRol}
                        >
                            Actualizar
                        </button>
                    </div>
                </div>
            )}

            <div className="flex justify-between">
                <button
                    onClick={() => window.history.back()}
                    className="block bg-gray-500 text-white py-2 px-4 rounded-md text-center mt-4"
                >
                    ATRAS
                </button>
                <Link
                    to="/home"
                    className="block w-full max-w-xs mx-auto bg-blue-500 text-white py-2 px-4 rounded-md text-center mt-4"
                >
                    Volver a la pantalla principal
                </Link>
            </div>
        </div>
    );
};

export default RolScreen;
