import axios from 'axios';

const API_URL = 'http://localhost:8080/api/v1/categoria';

export const CategoriaService = {
  getAllCategorias: async () => {
    try {
        const response = await axios.get(API_URL, {
          headers: {
            'Authorization': "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZ3VzdGluZ3JpQGdtYWlsLmNvbSIsImlhdCI6MTcyMDMwMDcyMiwiYWd1c3RpbmdyaUBnbWFpbC5jb20iOiIkMmEkMTAkY0suRU1tN0d0RmVsQmEwenJrRXJpT3RHdnhZOG1PVVAvVUg1TXA2M3ZFemJoV1dDVlpVMkMiLCJleHAiOjE3MjAzODcxMjJ9.Z-y8vwuyxVVgNoty8wKMufzP-EMJjTaijKSqskbRg_hSEmOdtTklf9X3ib6gemHUgrFi1c28H9byo9_6wYp54A"
          }
        });

    //   const response = await fetch(API_URL, {
    //     method: 'GET',
    //     headers: new Headers({
    //         'Content-Type': 'application/json',
    //         'Authorization': `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZ3VzdGluZ3JpQGdtYWlsLmNvbSIsImlhdCI6MTcyMDMwMDcyMiwiYWd1c3RpbmdyaUBnbWFpbC5jb20iOiIkMmEkMTAkY0suRU1tN0d0RmVsQmEwenJrRXJpT3RHdnhZOG1PVVAvVUg1TXA2M3ZFemJoV1dDVlpVMkMiLCJleHAiOjE3MjAzODcxMjJ9.Z-y8vwuyxVVgNoty8wKMufzP-EMJjTaijKSqskbRg_hSEmOdtTklf9X3ib6gemHUgrFi1c28H9byo9_6wYp54A`
    //     }),
    //     mode: 'cors'
    // });

      return response.data;
    } catch (error) {
      throw new Error(`Error al obtener las categorías: ${error.message}`);
    }
  },

  getCategoriaById: async (id) => {
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(`Error al obtener la categoría con ID ${id}: ${error.message}`);
    }
  },

  createCategoria: async (categoria) => {
    try {
      const response = await axios.post(API_URL, categoria);
      return response.data;
    } catch (error) {
      throw new Error(`Error al crear la categoría: ${error.message}`);
    }
  },

  updateCategoria: async (id, categoria) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, categoria);
      return response.data;
    } catch (error) {
      throw new Error(`Error al actualizar la categoría con ID ${id}: ${error.message}`);
    }
  },



  
  deleteCategoria: async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
    } catch (error) {
      throw new Error(`Error al eliminar la categoría con ID ${id}: ${error.message}`);
    }
  }
};
