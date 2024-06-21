import React, { createContext, useState, useContext } from 'react';
import RolService from '../Services/rolService';


const RolContext = createContext();


export const useRolContext = () => useContext(RolContext);


export const RolProvider = ({ children }) => {
    const [roles, setRoles] = useState([]);
    const [error, setError] = useState(null);

    
    const loadRoles = async () => {
        try {
            const data = await RolService.getAllRoles();
            setRoles(data);
        } catch (error) {
            setError(error.message);
        }
    };

    
    const getRolById = async (id) => {
        try {
            const data = await RolService.getRolById(id);
            return data;
        } catch (error) {
            setError(error.message);
            throw error;
        }
    };

    
    const createRol = async (rol) => {
        try {
            const data = await RolService.createRol(rol);
            setRoles([...roles, data]); 
            return data;
        } catch (error) {
            setError(error.message);
            throw error;
        }
    };

    
    const updateRol = async (id, rol) => {
        try {
            const data = await RolService.updateRol(id, rol);
            const updatedRoles = roles.map((r) => (r.id === id ? data : r));
            setRoles(updatedRoles);
            return data;
        } catch (error) {
            setError(error.message);
            throw error;
        }
    };

    
    const deleteRol = async (id) => {
        try {
            await RolService.deleteRol(id);
            const updatedRoles = roles.filter((r) => r.id !== id);
            setRoles(updatedRoles);
        } catch (error) {
            setError(error.message);
            throw error;
        }
    };

    
    const contextValue = {
        roles,
        error,
        loadRoles,
        getRolById,
        createRol,
        updateRol,
        deleteRol
    };

    
    return <RolContext.Provider value={contextValue}>{children}</RolContext.Provider>;
};
