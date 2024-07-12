import React from 'react';
import { useSelector } from 'react-redux';

export const Filters = ({ onFilter }) => {
    const categorias = useSelector((state) => state.categoria.categorias);
    const descuentos = useSelector((state) => state.descuento.descuentos);

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
            <select name="precio" onChange={handleFilterChange}>
                <option value="">Todos los precios</option>
                <option value="0-24999">0 a 24,999</option>
                <option value="25000-49999">25,000 a 49,999</option>
                <option value="50000-74999">50,000 a 74,999</option>
                <option value="75000-99999">75,000 a 99,999</option>
                <option value="100000+">Más de 100,000</option>
            </select>
        </div>
    );
};
