import React from 'react';

const useGetRandomPosition = () => {
  const left = Math.floor(Math.random() * 70) + 15;
  const top = 80;

  return { left: `${left}%`, top: `${top}%` }
}

export default useGetRandomPosition;