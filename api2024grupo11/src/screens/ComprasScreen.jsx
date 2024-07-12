import React, { useEffect, useState } from 'react';
import { CompraCard } from '../components/Cards/CompraCard';
import { useDispatch, useSelector } from 'react-redux';
import { fetchComprasByUserEmail } from '../Redux/ComprasSlice';
import {  Link} from 'react-router-dom';

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
            className="block bg-gray-500 text-white py-2 px-4 rounded-md text-center mt-4"
          >
            ATRAS
          </button>
        </div>
  
        <Link
          to="/"
          className="block w-full max-w-xs mx-auto bg-blue-500 text-white py-2 px-4 rounded-md text-center mt-4"
        >
          Volver a la pantalla principal
        </Link>
            </div>
        </>
    );
};
