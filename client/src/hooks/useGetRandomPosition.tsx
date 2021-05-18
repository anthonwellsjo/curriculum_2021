import React from 'react';

const useGetRandomPosition = () => {
  const left = Math.floor(Math.random() * 90) + 5;
  const top = Math.floor(Math.random() * 80) + 15;

  return { left: `${left}%`, top: `${top}%` }
}

export default useGetRandomPosition;