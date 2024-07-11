import React, { useEffect, useState } from 'react';
import { CompraCard } from '../components/Cards/CompraCard';

export const ComprasScreen = () => {
    const [compras, setCompras] = useState([]);

    const getCompras = async () => {
        const data = await fetch("http://localhost:8080/api/v1/compra/usuario/1").then(response => response.json());
        return data;
    };

    useEffect(() => {
        const fetchData = async () => {
            const data = await getCompras();
            setCompras(data);
        };

        fetchData();
    }, []);

    return (
        <>
            <div className='p-5 bg-[#f3f4f6] flex gap-2 flex-col'>
                <h2 className='text-2xl font-bold'>Mis compras</h2>
                {/* <div className='flex flex-col justify-center'>
                    {compras && compras.map(c => (<CompraCard compra={c} key={c.id} />))}
                </div> */}
            </div>
        </>
    );
};
