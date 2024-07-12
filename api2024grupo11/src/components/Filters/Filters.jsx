import React from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { filterProductos } from '../../Redux/ProductoSlice.jsx';

export const Filters = ({ onFilter }) => {
  const dispatch = useDispatch();
  const categorias = useSelector((state) => state.categoria.categorias);
  const descuentos = useSelector((state) => state.descuento.descuentos);

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    onFilter(name, value);
    dispatch(filterProductos({ searchTerm: '', filtroCategoria: name === 'categoria' ? parseInt(value) : null, filtroDescuento: name === 'descuento' ? parseInt(value) : null }));
  };

  return (
    <div>
      <h2>Filtros</h2>
      <select name="categoria" onChange={handleFilterChange}>
        <option value="">Todas las categorías</option>
        {categorias.map((categoria) => (
          <option key={categoria.id} value={categoria.id}>
            {categoria.descripcion}
          </option>
        ))}
      </select>
      <select name="descuento" onChange={handleFilterChange}>
        <option value="">Todos los descuentos</option>
        {descuentos.map((descuento) => (
          <option key={descuento.id} value={descuento.id}>
            {descuento.porcentaje}%
          </option>
        ))}
      </select>
    </div>
  );
};
