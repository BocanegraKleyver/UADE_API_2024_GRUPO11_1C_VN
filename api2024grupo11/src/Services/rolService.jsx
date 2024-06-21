import axios from 'axios';

const API_URL = 'http://localhost:8080/api/rol';

const RolService = {
    getAllRoles: async () => {
        try {
            const response = await axios.get(API_URL);
            return response.data;
        } catch (error) {
            console.error('Error fetching roles:', error);
            throw error;
        }
    },

    getRolById: async (id) => {
        try {
            const response = await axios.get(`${API_URL}/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching rol with ID ${id}:`, error);
            throw error;
        }
    },

    createRol: async (rol) => {
        try {
            const response = await axios.post(API_URL, rol);
            return response.data;
        } catch (error) {
            console.error('Error creating rol:', error);
            throw error;
        }
    },

    updateRol: async (id, rol) => {
        try {
            const response = await axios.put(`${API_URL}/${id}`, rol);
            return response.data;
        } catch (error) {
            console.error(`Error updating rol with ID ${id}:`, error);
            throw error;
        }
    },

    deleteRol: async (id) => {
        try {
            await axios.delete(`${API_URL}/${id}`);
        } catch (error) {
            console.error(`Error deleting rol with ID ${id}:`, error);
            throw error;
        }
    }
};

export default RolService;
