import React from 'react';
import { useCategoriaContext } from '../../context/CategoriaContext';
import { useDescuentoContext } from '../../context/DescuentoContext';

export const Filters = ({ onFilter }) => {
  const { categorias } = useCategoriaContext();
  const { descuentos } = useDescuentoContext();

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    onFilter(name, value);
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