import React from 'react';

const useGetRandomPosition = () => {
  const left = Math.floor(Math.random() * 30) + 35;
  const top = Math.floor(Math.random() * 30) + 35;

  return { left: `${left}%`, top: `${top}%` }
}

export default useGetRandomPosition;