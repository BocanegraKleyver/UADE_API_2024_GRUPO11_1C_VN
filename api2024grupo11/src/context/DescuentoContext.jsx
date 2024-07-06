import React, { createContext, useContext, useState, useEffect } from 'react';
import { DescuentoService } from '../Services/descuentoService';


const DescuentoContext = createContext();

export const useDescuentoContext = () => useContext(DescuentoContext);

export const DescuentoProvider = ({ children }) => {
  const [descuentos, setDescuentos] = useState([]);

  useEffect(() => {
    const fetchDescuentos = async () => {
      try {
        const data = await DescuentoService.getAllDescuentos();
        setDescuentos(data);
      } catch (error) {
        console.error('Error al obtener descuentos:', error.message);
      }
    };

    fetchDescuentos();
  }, []);

  const agregarDescuento = async (nuevoDescuento) => {
    try {
      const descuentoCreado = await DescuentoService.createDescuento(nuevoDescuento);
      setDescuentos([...descuentos, descuentoCreado]);
    } catch (error) {
      console.error('Error al crear descuento:', error.message);
      throw error;
    }
  };

  const actualizarDescuento = async (id, descuentoActualizado) => {
    try {
      const descuentoModificado = await DescuentoService.updateDescuento(id, descuentoActualizado);
      setDescuentos(descuentos.map((descuento) => (descuento.id === id ? descuentoModificado : descuento)));
    } catch (error) {
      console.error(`Error al actualizar descuento con ID ${id}:`, error.message);
      throw error;
    }
  };

  const eliminarDescuento = async (id) => {
    try {
      await DescuentoService.deleteDescuento(id);
      setDescuentos(descuentos.filter((descuento) => descuento.id !== id));
    } catch (error) {
      console.error(`Error al eliminar descuento con ID ${id}:`, error.message);
      throw error;
    }
  };

  return (
    <DescuentoContext.Provider 
      value={{
        descuentos, 
        agregarDescuento, 
        actualizarDescuento, 
        eliminarDescuento
      }}
    >
      {children}
    </DescuentoContext.Provider>
  );
};
