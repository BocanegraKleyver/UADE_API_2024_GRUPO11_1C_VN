import axios from 'axios';

const API_URL = 'http://localhost:8080/api/v1/descuento';

export const DescuentoService = {
 
  getAllDescuentos: async () => {
  try{
  const response = await axios.get(API_URL);
  return response.data;
  }catch(error){
    console.error('Error fetching descuentos:', error);
    throw error;
  }
},

 getDescuentoById: async (id) => {
  try{
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
}catch(error){
  console.error(`Error fetching descuento with ID ${id}:`, error);
  throw error;
}
},

 createDescuento: async (descuento) => {
  try{
  const response = await axios.post(API_URL, descuento);
  return response.data;
} catch (error) {
  console.error('Error creating descuento:', error);
  throw error;
}
},

 updateDescuento: async (id, descuento) => {
  try{
  const response = await axios.put(`${API_URL}/${id}`, descuento);
  return response.data;
} catch (error) {
  console.error(`Error updating descuento with ID ${id}:`, error);
  throw error;
}
},

 deleteDescuento: async (id) => {
  try {
  await axios.delete(`${API_URL}/${id}`);
} catch (error) {
  console.error(`Error deleting producto with ID ${id}:`, error);
  throw error;
}
}
};
