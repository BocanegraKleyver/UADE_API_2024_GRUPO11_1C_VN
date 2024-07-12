import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { CompraCard } from '../components/Cards/CompraCard';
import { fetchComprasByUserEmail } from '../Redux/ComprasSlice';

export const ComprasScreen = () => {

    const dispatch = useDispatch();
    const compras = useSelector((state) => state.compras);
    const userEmail = JSON.parse(localStorage.getItem("usuario")).registered_email;


    useEffect(() => {
        dispatch(fetchComprasByUserEmail(userEmail)); 
      }, [dispatch, userEmail])

    return (
        <>
            <div className='p-5 bg-[#f3f4f6] flex gap-2 flex-col'>
                <h2 className='text-2xl font-bold'>Mis compras</h2>
                <div className='flex flex-col justify-center gap-2'>
                    {compras && compras.compras.map(c => (<CompraCard compra={c} key={c.id} />))}
                </div>
                <div className="flex justify-between">
          <button
            onClick={() => window.history.back()}
            className="producto-agregar"
          >
            ATRAS
          </button>
        </div>
  
        <Link
          to="/"
          className="producto-agregar"
        >
          Volver a la pantalla principal
        </Link>
            </div>
        </>
    );
};
