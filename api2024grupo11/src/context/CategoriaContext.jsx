import React, { createContext, useContext, useEffect, useState } from 'react';
import { CategoriaService } from '../Services/categoriaService';


const CategoriaContext = createContext();


export const useCategoriaContext = () => useContext(CategoriaContext);


export const CategoriaProvider = ({ children }) => {
  const [categorias, setCategorias] = useState([]);


  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const data = await CategoriaService.getAllCategorias();
        setCategorias(data);
      } catch (error) {
        console.error('Error al cargar las categorías:', error.message);
      }
    };

    fetchCategorias();
  }, []);

  const agregarCategoria = async (nuevaCategoria) => {
    try {
      const categoriaCreada = await CategoriaService.createCategoria(nuevaCategoria);
      setCategorias([...categorias, categoriaCreada]);
    } catch (error) {
      console.error('Error al crear la categoría:', error.message);
      throw error;
    }
  };

  const actualizarCategoria = async (id, categoriaActualizada) => {
    try {
      const categoriaActualizadaResp = await CategoriaService.updateCategoria(id, categoriaActualizada);
      setCategorias(categorias.map(categoria => (categoria.id === id ? categoriaActualizadaResp : categoria)));
    } catch (error) {
      console.error(`Error al actualizar la categoría con ID ${id}:`, error.message);
      throw error;
    }
  };

  const eliminarCategoria = async (id) => {
    try {
      await CategoriaService.deleteCategoria(id);
      setCategorias(categorias.filter(categoria => categoria.id !== id));
    } catch (error) {
      console.error(`Error al eliminar la categoría con ID ${id}:`, error.message);
      throw error;
    }
  };

  return (
    <CategoriaContext.Provider
      value={{
        categorias,
        agregarCategoria,
        actualizarCategoria,
        eliminarCategoria
      }}
    >
      {children}
    </CategoriaContext.Provider>
  );
};

