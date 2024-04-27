import React from 'react'

export const IncrementItemButton = ({onIncrement}) => {
  return (
    <button onClick={onIncrement} className='cursor-pointer hover:bg-slate-300 rounded-full'>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="gray" className="w-4 h-4">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
      </svg>  
    </button>
    )
}
