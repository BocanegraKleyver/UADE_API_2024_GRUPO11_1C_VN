import React, { createContext, useState, useContext } from 'react';
import RolService from '../Services/rolService'; // Ajusta la ruta según la estructura de tu proyecto

// Creamos el contexto
const RolContext = createContext();

// Hook personalizado para acceder al contexto
export const useRolContext = () => useContext(RolContext);

// Proveedor del contexto, donde definimos el estado y las funciones relacionadas con los roles
export const RolProvider = ({ children }) => {
    const [roles, setRoles] = useState([]);
    const [error, setError] = useState(null); // Manejo de errores opcional

    // Función para cargar todos los roles
    const loadRoles = async () => {
        try {
            const data = await RolService.getAllRoles();
            setRoles(data);
        } catch (error) {
            setError(error.message); // Opcional: manejo de errores
        }
    };

    // Función para obtener un rol por su ID
    const getRolById = async (id) => {
        try {
            const data = await RolService.getRolById(id);
            return data;
        } catch (error) {
            setError(error.message); // Opcional: manejo de errores
            throw error;
        }
    };

    // Función para crear un nuevo rol
    const createRol = async (rol) => {
        try {
            const data = await RolService.createRol(rol);
            setRoles([...roles, data]); // Actualizamos localmente el estado de roles
            return data;
        } catch (error) {
            setError(error.message); // Opcional: manejo de errores
            throw error;
        }
    };

    // Función para actualizar un rol existente
    const updateRol = async (id, rol) => {
        try {
            const data = await RolService.updateRol(id, rol);
            const updatedRoles = roles.map((r) => (r.id === id ? data : r));
            setRoles(updatedRoles); // Actualizamos localmente el estado de roles
            return data;
        } catch (error) {
            setError(error.message); // Opcional: manejo de errores
            throw error;
        }
    };

    // Función para eliminar un rol
    const deleteRol = async (id) => {
        try {
            await RolService.deleteRol(id);
            const updatedRoles = roles.filter((r) => r.id !== id);
            setRoles(updatedRoles); // Actualizamos localmente el estado de roles
        } catch (error) {
            setError(error.message); // Opcional: manejo de errores
            throw error;
        }
    };

    // Creamos el objeto de contexto con las funciones y el estado necesario
    const contextValue = {
        roles,
        error,
        loadRoles,
        getRolById,
        createRol,
        updateRol,
        deleteRol
    };

    // Devolvemos el proveedor del contexto con su valor
    return <RolContext.Provider value={contextValue}>{children}</RolContext.Provider>;
};
